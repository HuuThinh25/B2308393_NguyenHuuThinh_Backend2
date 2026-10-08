const express = require("express");
const cors = require("cors");
const contactsRouter = require("./app/routes/contact.route");
const ApiError = require("./app/api-error");

const app = express();

// 1. Middleware chung (phải đứng trước route)
app.use(cors());
app.use(express.json());

// 2. Route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact book application." });
});

app.use("/api/contacts", contactsRouter);

// 3. Xử lý 404 (sau tất cả route)
app.use((req, res, next) => {
    // Code ở đây chạy khi không có route nào khớp yêu cầu.
    // Gọi next() để chuyển sang middleware xử lý lỗi
    return next(new ApiError(404, "Resource not found"));
});

// 4. Middleware xử lý lỗi (đặt cuối cùng)
app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

module.exports = app;