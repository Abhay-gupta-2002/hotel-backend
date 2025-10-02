const express=require('express');
const router=express.Router();
const MenuItem=require('../models/MenuItem');

router.post('/',async(req,res)=>{
    try{
        const data=req.body;
        const newitem=new MenuItem(data);
        const response=await newitem.save();
        console.log('data saved');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
})
 
router.get('/',async (req,res)=>{
    try{
        const data = await MenuItem.find();
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
})

router.get('/taste/:tasteType',async (req,res)=>{
    try{
    const tasteType = req.params.tasteType.toLowerCase();
    if(tasteType=='sour'||tasteType=='spicy'||tasteType=='sweet'){
        const response = await MenuItem.find({ taste: tasteType });
        console.log('response fetched');
        res.status(200).json(response);
    }else{
        res.status(400).json({error:'taste is different'});
    }
}catch(err){
    console.log(err);
    res.status(500).json({error:'internal server error'});
}
})

router.put('/:id',async(req,res)=>{
    try{
        const menuId=req.params.id;
        const updatedItem=req.body;
        const response =await MenuItem.findByIdAndUpdate(menuId,updatedItem,{
          new:true,
          runValidators:true

        });
        if(!response) return res.status(400).json({error:'item not found'});
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
})
router.delete('/:id',async(req,res)=>{
    try{
        const menuid=req.params.id;
        const response=await MenuItem.findByIdAndDelete(menuid);
        if(!response)return res.status(400).json({error:'id not available'});
        res.status(200).json({message:'menuitem deleted successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
})
module.exports = router;