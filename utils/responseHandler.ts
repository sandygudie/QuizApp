export const successResponse = (res:any, statusCode:number,message:string,  data = {}) => {
    res.status(statusCode).json({
      success: true,
      message,
      data
    })
  }
  export  const errorResponse = (res:any, statusCode:number, message:string) => {
    res.status(statusCode).json({
      success: false,
      message
    })
  }
 
  

  