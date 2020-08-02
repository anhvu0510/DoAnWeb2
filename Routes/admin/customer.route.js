const Express = require("express");
const Router = Express.Router();
const Customer = require("../../Services/customer");
const User = require("../../Services/user");
const Payment = require("../../Services/payment_account");
const { Upload } = require("../../Services/upload");
const { isStaff } = require("../../Middleware/auth");

Router.use(isStaff);

Router.get("/", async (req, res) => {
    Customer.findAll({
        where: {},
        include: [
            {
                model: User,
                where: {},
                attributes: ["StatusID"],
            },
        ],
    }).then((data) => {
        console.log(data);

        res.render("admin/PageCustomer", {
            title: "Customer Managament",
            CustomerName: "Staff",
            data,
        });
    })
    .catch((err) => {
            console.log(err);
    });

});




Router.post("/", (req, res) => {
    Upload(req, res, (err) => {
        if (err) {
            console.log(err);
        }
        const {
            ID,
            Fullname,
            DOB,
            Gender,
            Phone,
            Address,
            Identify,
            IdentifyNumber,
            IdentifyDate,
        } = req.body;
        const { imgFontFile, imgEndFile } = req.files;
        const temp = ID.split("/");

        const id = temp[0];
        const Font = temp[1];
        const End = temp[2];

        console.log(req.body);
        if (imgEndFile !== undefined) {
            End = imgFontFile[0].filename;
        }
        if (imgFontFile !== undefined) {
            Font = imgFontFile[0].filename;
        }

        Customer.update(
            {
                name: Fullname,
                dob: DOB,
                phone: Phone,
                address: Address,
                gender: Gender,
                identify: Identify,
                identifyID: IdentifyNumber,
                identifyDate: IdentifyDate,
                identifyFontImg: Font,
                identifyEndImg: End,
            },
            { where: { id } }
        )
            .then((result) => {
                console.log(result);
                req.flash("success_msg", "Update Customer Infomation Success");
                res.redirect("/admin/customer");
            })
            .catch((err) => {
                console.log(err);
                req.flash("error_msg", "Update Customer Infomation Fail");
                res.redirect("/admin/customer");
            });
    });
});

Router.get("/save/:id/:identify", (req, res) => {
    const { id, identify } = req.params;
    User.update({ StatusID: 3 }, { where: { id } })
        .then(async (rs) => {
            const accountnumber = identify + Math.floor(Math.random() * 999999);
            await Payment.create({
                account_number: accountnumber,
                issue_date: new Date(),
                balance: 0,
                currency: "VND",
                transger_limit: 5000000,
                userId: req.user.id,
            })
                .then((user) => {
                    console.log("Create Payment Account Success");
                    req.flash("success_msg", "Update Customer Infomation Success");
                    res.redirect("/admin/customer");
                })
                .catch((err) => {
                    console.log("Create Payment Fail");
                    req.flash("error_msg", "Error when create payment account");
                    res.redirect("/admin/customer");
                    console.log(err);
                });
        })
        .catch((err) => {
            req.flash("error_msg", "Update Customer Infomation Fail");
            res.redirect("/admin/customer");
        });
});

module.exports = Router;
