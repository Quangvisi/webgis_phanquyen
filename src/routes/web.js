import express from "express";
import homePageController from "../controllers/homePageController";
//import userPageController from "../controllers/userPageController";

const router = express.Router();

const initWebRoutes = (app) => {
    router.get("/", homePageController.handleHomePage);
    router.get("/user", homePageController.handleUserPage);
    router.post("/users/create-user", homePageController.handleCreateNewUser);
    router.post("/delete-user/:id", homePageController.handleDeleteUser);
    router.post("/update-user/:id", homePageController.getUpdateUser);
    return app.use("/", router);
};

export default initWebRoutes;
