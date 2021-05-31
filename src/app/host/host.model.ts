
export class Host {
   public imagePath: string;
   public title: string;
   public content: string;
   public adress: string;
   public description: string;
 
  constructor(imagePath: string, title: string, content: string, adress: string, description: string) {
    this.imagePath = imagePath;
    this.title = title;
    this.content = content;
    this.adress = adress;
    this.description = description;
    
  }
}