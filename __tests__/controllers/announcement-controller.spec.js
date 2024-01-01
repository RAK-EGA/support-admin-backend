const {postAnnouncement} = require('../../controllers/announcement-controller');
const {updateAnnouncement} = require('../../controllers/announcement-controller');
const Announcement = require('../../models/Announcement');

jest.mock('../../models/Announcement');

const mockSavedAnnouncement = {
  _id: 'uniqueId',
  title: 'title',
  body: 'body',
};

const mockInstance = {
  save: jest.fn().mockResolvedValue(mockSavedAnnouncement),
};

Announcement.mockImplementation(() => mockInstance);

const req = {
  body: {
    title: 'fake-title',
    body: 'fake-body',
  },
};

it('should send a status code of 201 when an announcement is posted', async () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await postAnnouncement(req, res);
  expect(mockInstance.save).toHaveBeenCalledTimes(1);
  expect(res.status).toHaveBeenCalledWith(201);
});

