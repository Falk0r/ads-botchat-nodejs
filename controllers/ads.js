const mongoose = require("mongoose");
const Ads = require("../models/ads");
const keys = require("../config/keys");

mongoose.connect(keys.mongodb.dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const getAllAds = async (user) => {
    try {
        const getAll = await Ads.find({ user: user.userId });
        return getAll;        
    } catch (error) {
        return ({ message: "error to retrieve ads" });
    }
}

const createAds = async (owner, datas) => {
    console.log(datas);
    const user = owner.userId;
    const title = datas.title;
    const text = datas.text;
    const image = datas.image;
    const url = datas.url;
    const link = datas.link;

    if (!user || !title || !text || !image || !url || !link) {
        return ({ message: "error to create an ad" });
    }

    const new_ads = new Ads({
        user,
        title,
        text,
        image,
        url,
        link,
    });
    try {
        await new_ads.save();
        return new_ads;
    } catch (error) {
        return ({ message: "error to create an ad" });
    }
}

const deleteAds = async (ads) => {
    try {
        const del = await Ads.deleteOne({_id: ads});
        return del;
    } catch (error) {
        return ({ message: "error to delete an ad" });
    }
}

const updateAds = async (ads) => {
    const id = ads._id;
    const ad = await Ads.findById(id);

    if (ads.title) {
        ad.title = ads.title;
    }
    if (ads.text) {
        ad.text = ads.text;
    }
    if (ads.image) {
        ad.image = ads.image;
    }
    if (ads.url) {
        ad.url = ads.url;
    }
    try {
        await ad.save();
        return ad;
    } catch (error) {
        return ({message: "error to update ads"})   
    }
}

module.exports.getAllAds = getAllAds;
module.exports.createAds = createAds;
module.exports.deleteAds = deleteAds;
module.exports.updateAds = updateAds;