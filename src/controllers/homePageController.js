import userService from '../services/userServices';
const handleHomePage = (req, res) => {
    return res.render("homePage.ejs");
};

const handleUserPage = async (req, res) => {
    //model => get data form database
    let userList = await userService.getUserList();
    await userService.deleteUser();
    return res.render("userPage.ejs", { userList });
};

const handleCreateNewUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    userService.createNewUser(email, password, username);

    return res.redirect("/user");
};

const handleDeleteUser = async (req, res) => {
    // console.log(">>>check id:", req.params.id);
    await userService.deleteUser(req.params.id);
    return res.redirect("/user");
}

const getUpdateUser = async (req, res) => {
    await userService.deleteUser(req.params.id);
    return res.render("user-update.ejs");
}

module.exports = {
    handleHomePage, handleCreateNewUser, handleUserPage, handleDeleteUser, getUpdateUser
};
