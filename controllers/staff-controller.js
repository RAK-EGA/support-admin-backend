const Staff = require("../models/StaffMember");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const signin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      if (!email || !password) {
        res.status(400).json({ message: "All fields are mandatory" });
        return;
      }
  
      const user = await Staff.findOne({ email }).select('+password'); // Include the password field for verification
  
      if (!user) {
        res.status(404).json({ message: "This email is not registered!" });
        return;
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (isMatch) {
        // User authenticated successfully
        const { _id, name, email, department } = user; // Selectively choose fields to include in the response
  
        const accessToken = jwt.sign(
          {
            user: { id: _id, name, email, department },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30m" }
        );
  
        res.status(200).json({ user: { id: _id, name, email, department }, accessToken });
      } else {
        res.status(400).json({ message: "Incorrect password!!" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  

const viewstaffs = async (req, res) => {
    let users;
    try {
        users = await Staff.find().select('-password'); // Exclude the password field
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }

    if (!users || users.length === 0) {
        return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json({ users });
};

const viewstaff = async (req, res) => {
    const staffID = req.params.staffID; 
    try {
        const staff = await Staff.findById(staffID).select('-password'); // Exclude the password field
        if (!staff) {
            return res.status(404).json({ msg: "Staff not found" });
        }
        res.status(200).json({ msg: "Staff details", staff });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

const addstaff = async(req, res)=>{
    const {name, email, password, confirmPassword, department} = req.body;
    let existingUser;
    try {
        existingUser = await Staff.findOne({email});
        if (existingUser) {
            res.status(400).json({message:"this email already exist"});
        }else{
            if (password == confirmPassword) {
                const hashedPassword = bcrypt.hashSync(password);
                const newUser = new Staff({
                    name,
                    email,
                    department,
                    password: hashedPassword
                 })

                try {
                    await newUser.save();
                    res.status(201).json({newUser});
                } catch (error) {
                    console.log(error);
                } 
            }else{
                res.status(400).json({message:"the confirm password does not match the password!"})
            }
            
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const deletestaff = async(req, res)=>{
    const staffID = req.params.staffID; 
    try {
        const staff = await Staff.findById(staffID);
        if (!staff) {
            return res.status(404).json({ msg: "Staff not found" });
        }
        await Staff.deleteOne(staff);
        res.status(201).json({ msg: "successfully deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

const changePassword = async (req, res) => {
    const staffID = req.user.id;
    const { password, confirmPassword } = req.body;

    if (password === confirmPassword) {
        try {
            const hashedPassword = bcrypt.hashSync(password, 10); 

            const updatedStaff = await Staff.findByIdAndUpdate(
                staffID,
                { password: hashedPassword },
                { new: true } 
            );

            if (!updatedStaff) {
                return res.status(404).json({ message: "Staff not found" });
            }

            const staffData = {
                _id: updatedStaff._id,
                name: updatedStaff.name,
                email: updatedStaff.email,
                department: updatedStaff.department,
                inProgressTickets: updatedStaff.inProgressTickets,
                counter: updatedStaff.counter,
                dayCounter: updatedStaff.dayCounter,
                createdAt: updatedStaff.createdAt,
                updatedAt: updatedStaff.updatedAt,
                __v: updatedStaff.__v
            };

            res.status(200).json({ message: "Password updated successfully", staff: staffData });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.status(400).json({ message: "The confirm password does not match the password!" });
    }
};

const updateDepartment = async (req, res) => {
    const staffID = req.params.staffID;
    const { department } = req.body;

    try {
        const updatedStaff = await Staff.findByIdAndUpdate(
            staffID,
            { department: department },
            { new: true } // Return the updated document
        );

        if (!updatedStaff) {
            return res.status(404).json({ message: "User not found" });
        }

        const staffData = {
            _id: updatedStaff._id,
            name: updatedStaff.name,
            email: updatedStaff.email,
            department: updatedStaff.department,
            inProgressTickets: updatedStaff.inProgressTickets,
            counter: updatedStaff.counter,
            dayCounter: updatedStaff.dayCounter,
            createdAt: updatedStaff.createdAt,
            updatedAt: updatedStaff.updatedAt,
            __v: updatedStaff.__v
        };

        res.status(200).json({ message: "Department updated successfully", staff: staffData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const viewprofile = async (req, res) => {
    const userID = req.user.id;
    
    try {
        const staff = await Staff.findById(userID);

        if (!staff) {
            res.status(404).json({ message: "Staff not found" });
            return;
        }

        const staffData = {
            _id: staff._id,
            name: staff.name,
            email: staff.email,
            department: staff.department,
            inProgressTickets: staff.inProgressTickets,
            counter: staff.counter,
            dayCounter: staff.dayCounter,
            createdAt: staff.createdAt,
            updatedAt: staff.updatedAt,
            __v: staff.__v
        };

        res.status(200).json(staffData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const deleteMultiStaff = async (req, res) => {
    const {staffIDs} = req.body;

    try {
        for (const staffID of staffIDs) {
            try {
                const staff = await Staff.findById(staffID);
                if (!staff) {
                    return res.status(404).json({ msg: `Staff with the id: ${staffID} was not found` });
                }
                await Staff.deleteOne({ _id: staffID });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: "Internal Server Error" });
            }
        }

        res.status(200).json({ msg: "Successfully deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const refreshToken = async (req, res) => {
    const email = req.user.email;
    
    try {
        const staff = await Staff.findOne({ email: email });

        if (!email || !staff) {
            res.status(404).json({ message: "Staff not found" });
            return;
        }

        const staffData = {
            _id: staff._id,
            name: staff.name,
            email: staff.email,
            department: staff.department,
            inProgressTickets: staff.inProgressTickets,
            counter: staff.counter,
            dayCounter: staff.dayCounter,
            createdAt: staff.createdAt,
            updatedAt: staff.updatedAt,
            __v: staff.__v
        };

        const accessToken = jwt.sign(
            {
                staff: {
                    id: staff._id,
                    name: staff.name,
                    email: staff.email,
                    department: staff.department,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30m" }
        );

        res.status(200).json({ staff: staffData, accessToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = refreshToken;

  

const hi = (req, res) => {
    res.status(200).json({message:"hi suhail"});
};

module.exports = {
    signin,
    refreshToken,
    viewstaff,
    addstaff,
    deletestaff,
    viewstaffs,
    changePassword,
    updateDepartment,
    viewprofile,
    deleteMultiStaff,
    hi
}
