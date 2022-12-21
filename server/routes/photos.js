const express = require("express");
const router = express.Router();
const { Photo } = require("../models/Photo");
const { auth } = require("../middleware/auth");

//사진 등록
router.post('/register', auth, (req,res)=>{
    const photo = new Photo(req.body)
    photo.user = req.user.id


  photo.save((err, photo) => {
    if (err) return res.status(400).send(err);

    return res.status(200).json({
      registerPhotoSuccess: true,
      photo: photo,
    });
  });
});

//유저 사진 리스트업
router.get("/:userId/listUp", (req, res) => {
  Photo.find({ user: req.params.userId }, (err, photos) => {
    if (err) {
      console.log("list up photo error");
      return res.status(400).send(err);
    }
    return res.status(200).json({
      listUpPhotoSuccess: true,
      photos: photos,
    });
  });
});

//사진 상세 정보
router.get("/:photoId", (req, res) => {
  Photo.findOne({ _id: req.params.photoId }, (err, info) => {
    if (err) {
      return res.status(400).send(err);
    }
    return res.status(200).json({
      getPhotoInfoSuccess: true,
      info: info,
    });
  });
});

//사진 상세 정보 변경
router.post("/:photoId/edit", (req, res) => {
  Photo.findOneAndUpdate({ _id: req.params.photoId }, req.body, (err) => {
    if (err) {
      return res.status(400).send(err);
    }
    return res.status(200).json({
      editPhotoInfoSuccess: true,
    });
  });
});

//사진 상세 정보 삭제
router.post('/:photoId/delete',(req,res)=>{
    Photo.deleteOne({ _id : req.params.photoId},(err)=>{
        if(err){
            return res.status(400).send(err);
        }
        return res.status(200).json({
            deletePhotoSuccess:true
        })
    })
})



module.exports = router;
