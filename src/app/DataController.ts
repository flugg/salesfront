import { DataProviderService } from "./data-provider.service";
import { BehaviorSubject } from "rxjs";

export class DataController{
  public subject: BehaviorSubject<any[]>;

  constructor(
    private service: DataProviderService,
    private channel: string,
    private path: string[]
  ) {
    this.start(channel, path);
  }

  private start(channel: string, path: string[]){
    this.subject = this.service.get(path);
    this.service.listen(channel, this.eventNamer('add')).subscribe(event => this.onAdd(event));
    this.service.listen(channel, this.eventNamer('remove')).subscribe(event => this.onRemove(event));
    this.service.listen(channel, this.eventNamer('edit')).subscribe(event => this.onEdit(event));
  }

  private onAdd(entry?){
    if(entry === null) return;
    this.subject.getValue().push(entry);
  }

  private onRemove(entry?){
    if(entry === null) return;
    this.subject.getValue().splice(this.subject.getValue().indexOf(entry), 1);
  }

  private onEdit(entry?){
    if(entry === null) return;
    for (let e of this.subject.getValue()){
      if(entry.id === e.id)
        e = entry;
    }
  }

  private eventNamer(prefix: string): string {
    console.log(prefix + this.path[0]);
    return prefix + this.path[0];
  }
}
