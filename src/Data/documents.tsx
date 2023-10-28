
export type DocumentType = {
  id: string;
  name: string;
  uri: string;
  fileType: "pdf" | "xlsx" | "docx" | "ppt";
  assign?:string;
  status?:string
};

export const documents: DocumentType[] = [
  {
    id: "1",
    name: "file pdf",
    uri: "https://transfer.sh/xoX3zbptCa/sample.pdf",

    fileType:"pdf",
  },
  {
    id: "2",
    name: " file excel",
    uri: "https://transfer.sh/q4buz0UJBe/%E5%8F%82%E6%95%B0%E8%A1%A8.xlsx",
 

    fileType:"xlsx",
  },
  {
    id: "3",
    name: " file words",
    uri: "https://transfer.sh/y2yVQsjexH/file-sample_100kB.docx",

    fileType:"docx",
  },
  {
    id: "4",
    name: " file powerpoints",
    uri: "https://transfer.sh/VrgnOVcU4D/pptexamples.ppt",

    fileType:"ppt",
  },
];

export default documents