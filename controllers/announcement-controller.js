const Announcement = require("../models/Announcement");

const postAnnouncement = async(req, res) =>{
    const {title, body} = req.body;
    try {
                const newAnnouncement = new Announcement({
                   title,
                   body
                 })

                try {
                    await newAnnouncement.save();
                    res.status(201).json({newAnnouncement});
                } catch (error) {
                    console.log(error);
                } 
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const updateAnnouncement = async(req, res) =>{
    const announcementId = req.params.announcementId;
    const { title,body } = req.body;
    try {
        const updatedAnnouncement = await Announcement.findByIdAndUpdate(
            announcementId,
            { title: title },
            {body: body},
            { new: true } // Return the updated document
        );

        if (!updatedAnnouncement) {
            return res.status(404).json({ message: "Announcement not found" });
        }

        const resultAnnouncement = await Announcement.findById(announcementId);

        res.status(201).json({ message: "announcement updated successfully", announcement: resultAnnouncement });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const deleteAnnouncement = async(req, res) =>{
    const announcementId = req.params.announcementId; 
    try {
        const announcement = await Announcement.findById(announcementId);
        if (!announcement) {
            return res.status(404).json({ msg: "Announcement not found" });
        }
        await Announcement.deleteOne(announcement);
        res.status(201).json({ msg: "successfully deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

const viewAnnouncements = async(req, res) =>{
    let announcements;
    try {
        announcements = await Announcement.find();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
    if(!announcements){
        res.status(404).json({message:"No announcements Found"});
    }
    
    return res.status(200).json({announcements});
}
const viewAnnouncement = async(req, res) =>{
    const announcementId = req.params.announcementId; 
    try {
        const announcement = await Announcement.findById(announcementId);
        if (!announcement) {
            return res.status(404).json({ msg: "announcement not found" });
        }
        res.status(200).json({ msg: "announcement details", announcement });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

const searchAnnouncement = async(req, res) => {
    const {title} = req.body;
    let announcements;
    try {
        announcements = await Announcement.find({
            title: { $regex: new RegExp(title, 'i') }
        })
        res.status(200).json({ msg: "announcements details", announcements });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

const deleteMultiAnnouncements = async (req, res) => {
    const {announcementIDs} = req.body;

    try {
        for (const announcementID of announcementIDs) {
            try {
                const announcement = await Announcement.findById(announcementID);
                if (!announcement) {
                    return res.status(404).json({ msg: "Announcement not found" });
                }
                await Announcement.deleteOne({ _id: announcementID });
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

module.exports = {
    postAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    viewAnnouncement,
    viewAnnouncements,
    searchAnnouncement,
    deleteMultiAnnouncements
}