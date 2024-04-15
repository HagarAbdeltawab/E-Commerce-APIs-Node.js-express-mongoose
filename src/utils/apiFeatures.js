export class ApiFeatures {

    constructor(mongooseQuery,searchQuery){
        this.mongooseQuery = mongooseQuery,
        this.searchQuery = searchQuery
    }
    //?page = 1
    pagination(){
        
        if (this.searchQuery.page <= 0) this.searchQuery.page = 1  
        let pageNum = this.searchQuery.page * 1 || 1
        // limit -> number of items in every page
        let pageLimit = 4
        // skip  -> number items of skip pages 
        let skip = (pageNum - 1) * pageLimit
        this.mongooseQuery.skip(skip).limit(pageLimit)
        return this
    }
    //?price[gt]=500
    filter(){
        let filterObj = {...this.searchQuery}
        let excludedFields = ['page','sort','fields','keyword']
        excludedFields.map(val => delete filterObj[val])

        filterObj = JSON.stringify(filterObj)
        filterObj = filterObj.replace(/('gte|gt|lt|lte')/g, match =>'$'+match)
        filterObj = JSON.parse(filterObj)
        this.mongooseQuery.find(filterObj)
        return this 
    }
    //?sort=-price,sold  
    sort(){
        if(this.searchQuery.sort){
            let sortBy =this.searchQuery.sort.split(',').join(' ')
            this.mongooseQuery.sort(sortBy)
        }
        return this
    }
    //?fields=title,price,description
    fields(){
        if(this.searchQuery.fields){
            let fields =this.searchQuery.fields.split(',').join(' ')
            this.mongooseQuery.select(fields)
        }
        return this
    }
    //?keyword=ay keyword in title or description
    search(){
        if(this.searchQuery.keyword){
            this.mongooseQuery.find({
                $or:[
                    {title:{$regex: this.searchQuery.keyword, $options:'i'}},
                    {description:{$regex: this.searchQuery.keyword, $options:'i'}}
                ]
            })
        }
        return this
    }
}