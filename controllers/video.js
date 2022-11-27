import User from "../Models/User.js";
import Video from "../Models/Video.js";
import { createError } from "../error.js";

export const addVideo = async (req, res, next) => {
  const newVideo = new Video({ userId: req.user.id, ...req.body });
  try {
    const savedvideo = await newVideo.save();
    res.status(200).json(savedvideo);
  } catch (error) {
    next(error);
  }
};

export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video NOt found"));
    if (req.params.id == req.user.id) {
      const updatevideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatevideo);
    } else {
      return next(createError(403, "You can update only your video!"));
    }
  } catch (error) {
    next(error);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "video not found"));
    if (req.params.id == req.user.id) {
      await Video.findByIdAndUpdate(req.params.id);
      res.status(200).json("The video has been deleted");
    } else {
      return next(createError(403, "You can delete only your video!"));
    }
  } catch (error) {
    next(error);
  }
};


export const getVideo = async (req, res, next) => {
    try {
      const video = await Video.findById(req.params.id);
      res.status(200).json(video);
    } catch (err) {
      next(err);
    }
  };

export const addView = async (req, res, next) => {
  try {
    const video = await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    },{new: true });
    res.status(200).json("the view has been incremented");
  } catch (error) {
    next(error);
  }
};

export const random = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

export const trend = async (req, res, next) => {
  try {
    const video = await Video.find().sort({ views: -1 });
    res.status(200).json(video);
  } catch (error) {}
};

export const sub = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;

    const list = await Promise.all(
      subscribedChannels.map(async (channelId) => {
        return await Video.find({ userId: channelId });
      })
    );

    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (err) {
    next(err);
  }
};

export const getByTag = async (req, res, next) => {
    const tags = req.query.tags.split(",");
    try {
      const videos = await Video.find({ tags: { $in: tags } }).limit(20);
      res.status(200).json(videos);
    } catch (err) {
      next(err);
    
    }
  };
  export const search = async (req, res, next) => {
    const query = req.query.q;
    try {
      const videos = await Video.find({
        title: { $regex: query, $options: "i" },
      }).limit(40);
      res.status(200).json(videos);
    } catch (err) {
      next(err);
    }
  };