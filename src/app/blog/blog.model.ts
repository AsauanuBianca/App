
  export interface Reply {
    currentDate : Date,
    commentTxt: string,
    commentName: string,
    commentEmail: string,
  }
  
  export interface Post {
      id?: string;
      commentId? : number,
      currentDate : Date,
      commentTxt: string,
      commentName: string,
      commentEmail: string,
      replyComment: Reply[],
    }
    