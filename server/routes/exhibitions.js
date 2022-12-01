const express = require('express');
const router = express.Router();
const { Exhibition } = require('../models/Exhibition');
const { auth } = require('../middleware/auth');
const url = require('url');

//전시회 등록
router.post('/register', auth, (req,res)=>{
    const exhibition = new Exhibition(req.body)
    exhibition.user = req.user.id

    exhibition.save((err,exhibition)=>{
        if(err)
            return res.status(400).send(err);
        
        return res.status(200).json({
            registerExhibitionSuccess: true,
            exhibition: exhibition
        })
    })
})

//유저 전시회 리스트업
router.get('/:userId/listUp',(req,res)=>{
    Exhibition.find({user : req.params.userId}, (err,exhibitions)=>{
        if(err){
            console.log('list up exhibition error')
            return res.status(400).send(err);
        }
        return res.status(200).json({
            listUpExhibitionSuccess: true,
            exhibitions: exhibitions
        })
    });

})

//유저 전시회 리스트업
router.get('/near',(req,res)=>{
    
    const queryData = url.parse(req.url, true).query;
    Exhibition.find({latitude : {$gte: Number(queryData.minLatitude), $lte: Number(queryData.maxLatitude)}, longitude: {$gte:Number(queryData.minLongitude), $lte: Number(queryData.maxLongitude)}}, (err,exhibitions)=>{
        if(err){
            console.log('list up exhibition error')
            return res.status(400).send(err);
        }
        return res.status(200).json({
            listUpExhibitionSuccess: true,
            exhibitions: exhibitions
        })
    });

})


//이웃 최근 전시회 5개 찾기
router.get('/following/recent', auth, (req,res)=>{
    Exhibition.find({ user : {$in: req.user.following}}).sort({createdAt : -1})
    .then((exhibitions)=>{
        return res.status(200).json({
            findFollowingRecentExhibitionSuccess: true,
            exhibitions: exhibitions.slice(0,5) // 5개만
        })
    }).catch((err) =>{
        return res.status(400).send(err);
    })

})


//전시회 상세 정보
router.get('/:exhibitionId',(req,res)=>{
    Exhibition.findOne({_id : req.params.exhibitionId},(err, info)=>{
        if(err){
            return res.status(400).send(err);
        }
        return res.status(200).json({
            getExhibitionInfoSuccess: true, 
            info: info
        })
    })
})

//전시회 상세 정보 변경
router.post('/:exhibitionId/edit',(req,res)=>{
    Exhibition.findOneAndUpdate({ _id : req.params.exhibitionId},req.body,(err)=>{
        if(err){
            return res.status(400).send(err);
        }
        return res.status(200).json({
            editExhibitionInfoSuccess:true
        })
    })
})

//전시회 상세 정보 삭제
router.get('/:exhibitionId/delete',(req,res)=>{
    Exhibition.deleteOne({ _id : req.params.exhibitionId},(err)=>{
        if(err){
            return res.status(400).send(err);
        }
        return res.status(200).json({
            deleteExhibitionSuccess:true
        })
    })
})

module.exports = router;