import express, { Request, Response, NextFunction } from "express";
const app = express();
import bodyParser from "body-parser";
import verifyFirebaseToken from "./middleware/authMiddleware";
// import verifyFirebaseToken from "./middleware/authMiddleware";
import cors from "cors";
import { prisma } from "./lib/prisma";
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// API versioning
const apiVersion = "/api/v1";

// Authentication routes
app.post(`${apiVersion}/auth/verify`, verifyFirebaseToken, async (req: Request, res: Response) => {
  const { uid, email, displayName, photoUrl, accessToken } = req.body;

  console.log(`uid:- ${uid}, email:- ${email}, displayName:- ${displayName}, photoUrl:- ${photoUrl}, accessToken:- ${accessToken}`);

  const user = await prisma.user.upsert({
    where: {
      uid: uid, // Use the unique identifier from your schema (e.g., `id` or `uid`)
    },
    update: {
      email,
      displayName,
      photoUrl,
      accessToken,
    },
    create: {
      uid, // Make sure all required fields are included in the `create` block
      email,
      displayName,
      photoUrl,
      accessToken,
    },
  });


  console.log(`user:- ${user}`);

  res.status(200).send({ message: "User authenticated successfully" });
});

// Task Management routes
app.get(`${apiVersion}/tasks/:userId`, async (req: Request, res: Response) => {
  // Fetch all tasks for the authenticated user
  const userId = req.params.userId;

  const result = await prisma.tasks.findMany({
    where: {
      userId
    },
  });

  console.log(`result:- ${JSON.stringify(result)}`);
  res.status(200).send({result });
});

app.post(`${apiVersion}/tasks`, verifyFirebaseToken, async (req: Request, res: Response) => {
  const { description, due_date, task_category, task_status, title, userId } = req.body;
  console.log(`task_category:- ${task_category}`);
  console.log(`task_status:- ${task_status}`);
  
  const result = await prisma.tasks.create({
    data: {
      title,
      description,
      category: task_category == "Work" ? "Work" : "Personal",
      DueOn: due_date,
      taskStatus: task_status == "completed" ? "COMPLETED" : task_status == "In-Progress" ? "INPROGRES" : "TODO",
      userId
    }
  });
  console.log(`result:- ${JSON.stringify(result)}`);

  res.status(201).send({ message: "Task created successfully", task: { title, description, task_category, due_date, task_status } });
});


// app.get(`${apiVersion}/tasks/:taskId`, verifyFirebaseToken, (req: Request, res: Response) => {
//   const { taskId } = req.params;
//   // Fetch single task logic here
//   res.status(200).send({ message: "Task fetched successfully", taskId });
// });

app.put(`${apiVersion}/tasks/:taskId`, verifyFirebaseToken, (req: Request, res: Response) => {
  const { taskId } = req.params;
  const { updates } = req.body;
  // Update task logic here
  res.status(200).send({ message: "Task updated successfully", taskId, updates });
});

app.delete(`${apiVersion}/tasks/:taskId`, verifyFirebaseToken, (req: Request, res: Response) => {
  const { taskId } = req.params;
  // Delete task logic here
  res.status(200).send({ message: "Task deleted successfully", taskId });
});


app.patch(`${apiVersion}/tasks/reorder`, verifyFirebaseToken, (req: Request, res: Response) => {
  const { reorderedTasks } = req.body;
  // Reorder tasks logic here
  res.status(200).send({ message: "Tasks reordered successfully", reorderedTasks });
});


// Batch Actions routes
app.delete(`${apiVersion}/tasks/batch`, verifyFirebaseToken, (req: Request, res: Response) => {
  const { taskIds } = req.body;
  // Delete multiple tasks logic here
  res.status(200).send({ message: "Batch delete successful", taskIds });
});

app.patch(`${apiVersion}/tasks/batch/complete`, verifyFirebaseToken, (req: Request, res: Response) => {
  const { taskIds } = req.body;
  // Mark multiple tasks as complete logic here
  res.status(200).send({ message: "Tasks marked as complete", taskIds });
});

// Task History and Activity Log routes
app.get(`${apiVersion}/tasks/:taskId/logs`, verifyFirebaseToken, (req: Request, res: Response) => {
  const { taskId } = req.params;
  // Fetch task activity log logic here
  res.status(200).send({ message: "Task activity log fetched", taskId });
});


// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});





// app.put(`${apiVersion}/users/:userId`, verifyFirebaseToken, (req: Request, res: Response) => {
//   const { userId } = req.params;
//   const { profile } = req.body;
//   // Update user profile logic here
//   res.status(200).send({ message: "Profile updated successfully", userId, profile });
// });

// app.get(`${apiVersion}/tasks?sort=dueDate&order=asc|desc`, verifyFirebaseToken, (req: Request, res: Response) => {
//   const { sort, order } = req.query;
//   // Sort tasks logic here
//   res.status(200).send({ message: "Tasks sorted successfully", sort, order });
// });

// File Attachment routes
// app.post(`${apiVersion}/tasks/:taskId/files`, verifyFirebaseToken, (req: Request, res: Response) => {
//   const { taskId } = req.params;
//   const { file } = req.body;
//   // Attach file logic here
//   res.status(200).send({ message: "File attached successfully", taskId, file });
// });

// app.get(`${apiVersion}/tasks/:taskId/files`, verifyFirebaseToken, (req: Request, res: Response) => {
//   const { taskId } = req.params;
//   // Fetch attached files logic here
//   res.status(200).send({ message: "Files fetched successfully", taskId });
// });

// app.delete(`${apiVersion}/tasks/:taskId/files/:fileId`, verifyFirebaseToken, (req: Request, res: Response) => {
//   const { taskId, fileId } = req.params;
//   // Delete file logic here
//   res.status(200).send({ message: "File deleted successfully", taskId, fileId });
// });

// Filtering routes
// app.get(`${apiVersion}/tasks`, verifyFirebaseToken, (req: Request, res: Response) => {
//   const { tags, category, dateStart, dateEnd } = req.query;
//   // Filter tasks logic here
//   res.status(200).send({ message: "Filtered tasks fetched", tags, category, dateStart, dateEnd });
// });

// app.get(`${apiVersion}/tasks/search`, verifyFirebaseToken, (req: Request, res: Response) => {
//   const { title } = req.query;
//   // Search tasks by title logic here
//   res.status(200).send({ message: "Search results fetched", title });
// });