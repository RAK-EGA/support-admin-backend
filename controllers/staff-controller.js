const Staff = require("../models/StaffMember");
const bcrypt = require("bcryptjs");

const signin = async(req, res)=>{
    const { email, password } = req.body;
  
    try {
      const user = await Staff.findOne({ email });
  
      if (!user) {
        res.status(404).json({ message: "This email is not registered!" });
        return;
      }
  
      const isMatch = await bcrypt.compare(password, user.password); 
  
      if (isMatch) {
        res.status(200).json({ user });
      } else {
        res.json({ message: "Incorrect password!!" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
}
const viewstaffs = async(req, res)=>{
    let users;
    try {
        users = await Staff.find();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
    if(!users){
        res.status(404).json({message:"No users Found"});
    }
    return res.status(200).json({users});
}

const viewstaff = async (req, res) => {
    const staffID = req.params.staffID; 
    try {
        const staff = await Staff.findById(staffID);
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
                res.json({message:"the confirm password does not match the password!"})
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
const changePassword = async(req, res)=>{
    const staffID = req.params.staffID;
    const { password, confirmPassword } = req.body;

    if (password === confirmPassword) {
        try {
            // Hash the new password
            const hashedPassword = bcrypt.hashSync(password, 10); // You may want to adjust the saltRounds

            // Update the staff with the new hashed password
            const updatedStaff = await Staff.findByIdAndUpdate(
                staffID,
                { password: hashedPassword },
                { new: true } // Return the updated document
            );

            if (!updatedStaff) {
                return res.status(404).json({ message: "Staff not found" });
            }

            res.status(200).json({ message: "Password updated successfully", staff: updatedStaff });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.status(400).json({ message: "The confirm password does not match the password!" });
    }

}

const updateDepartment = async(req, res)=>{
    const staffID = req.params.staffID;
    const { department } = req.body;
    try {
        const updatedStaff = await Staff.findByIdAndUpdate(
            staffID,
            { department: department },
            { new: true } // Return the updated document
        );

        if (!updatedStaff) {
            return res.status(404).json({ message: "department not found" });
        }

        res.status(200).json({ message: "department updated successfully", staff: updatedStaff });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    signin,
    viewstaff,
    addstaff,
    deletestaff,
    viewstaffs,
    changePassword,
    updateDepartment,
}