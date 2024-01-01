const { searchAnnouncement } = require('../../controllers/announcement-controller');
const Announcement = require('../../models/Announcement');

jest.mock('../../models/Announcement');

describe('searchAnnouncement', () => {
  it('should retrieve all announcements when title is null', async () => {
    const req = {
      body: {
        title: null,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await searchAnnouncement(req, res);

    expect(Announcement.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    // Add further assertions for the response content
  });

  it('should retrieve all announcements when title is an empty string', async () => {
    const req = {
      body: {
        title: '',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await searchAnnouncement(req, res);

    expect(Announcement.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    // Add further assertions for the response content
  });

  it('should retrieve announcements with provided title', async () => {
    const req = {
      body: {
        title: 'someProvidedTitle',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock Announcement.find() response to simulate finding announcements
    Announcement.find.mockResolvedValueOnce([{ _id: '1', title: 'someProvidedTitle' }]);

    await searchAnnouncement(req, res);

    expect(Announcement.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    // Add further assertions for the response content
  });

  it('should return a 404 when no announcements are found for provided title', async () => {
    const req = {
      body: {
        title: 'nonExistentTitle',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock Announcement.find() response as an empty array to simulate no announcements found
    Announcement.find.mockResolvedValueOnce([]);

    await searchAnnouncement(req, res);

    expect(Announcement.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
    // Add further assertions for the response content
  });
});
