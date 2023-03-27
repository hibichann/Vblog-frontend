/* eslint-disable @typescript-eslint/no-unused-vars */
// 定义接口的传参
interface blogByPage {
    page:number;
    classid?:number
}
interface blogByTag {
    page:number;
    tagid:number
}
interface tagitem{
    tag_id: string,
    tag_name: string
}
type allTags = tagitem[]
type card1 ={
    art: {
        enTotal: string
        cnTotal: string
      }
    cate: number
    tag: number
}