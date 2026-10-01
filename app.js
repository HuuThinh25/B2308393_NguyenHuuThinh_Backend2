const express = require('express');
const cors = require('cors');
const contactsRouter = require("./app/routes/contact.route");
const ApiError = require("./app/api-error");

const app = express();

app.use("/api/contacts", contactsRouter);

//handle 404 response
app.use((req, res, next) => {
    //code ở đây sẽ chạy khi không có route nào được định nghĩa
    // khớp yêu cầu gọi next chuyển sang middleware xử lý lỗi
    return next(new ApiError(404, "Resoure not found"));

});

//define error-handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next) => {
    //Middleware xử lý lỗi tập trung
    // trong các đoạn code xử lý ở các route, gọi next(error) sẽ chuyển về middleware xử lý lỗi này
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact book application." });
});

app.use("/api/contacts", contactsRouter);
module.exports = app;