export interface HeaderProperty{
    name:string;
    accesor:string;
    showName:boolean;
    renderAction: (data:any) => React.ReactElement
}
export interface TableComponentProps {
  data: any[];
  header: HeaderProperty[]
}