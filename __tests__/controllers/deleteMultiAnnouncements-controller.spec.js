const { deleteMultiAnnouncements } = require('../../controllers/announcement-controller');
const Announcement = require('../../models/Announcement');

jest.mock('../../models/Announcement');

describe('deleteMultiAnnouncements', () => {
  test.each([
    [['id1', 'id2', 'id3']], // Test case 1: Array of announcement IDs
    [['id4', 'id5']], // Test case 2: Another set of announcement IDs
    [['id6']], // Test case 3: Single announcement ID
  ])('should delete multiple announcements for %p', async (announcementIDs) => {
    // Mock request body with announcementIDs
    const req = {
      body: { announcementIDs },
    };

    // Mock response object with necessary functions
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock findById and deleteOne methods for successful deletion
    Announcement.findById.mockImplementation((id) => ({
      _id: id, // Mocking an existing announcement based on the ID
    }));

    Announcement.deleteOne.mockResolvedValueOnce({});

    await deleteMultiAnnouncements(req, res);

    // Expectations
    expect(Announcement.findById).toHaveBeenCalledTimes(announcementIDs.length); // Number of times findById is called
    expect(Announcement.deleteOne).toHaveBeenCalledTimes(announcementIDs.length); // Number of times deleteOne is called
    expect(res.status).toHaveBeenCalledWith(200); // Expect status 200 for successful deletion
    expect(res.json).toHaveBeenCalledWith({ msg: 'Successfully deleted' }); // Expect specific response message
  });
});
