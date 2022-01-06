import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-print-basic-information',
  templateUrl: './print-basic-information.component.html',
  styleUrls: ['./print-basic-information.component.scss'],
})
export class PrintBasicInformationComponent implements OnInit, OnChanges {
  @Input() type = '';
  @Input() title = '';
  logoSize = {
    width: 100,
    height: 100,
  };
  constructor() {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    this.changeHeaderTitle();
  }
  changeHeaderTitle() {
    if (this.type === 'order') {
      this.title = 'Order receipt';
    } else if (this.type === 'invoice') {
      this.title = 'Invoice receipt';
    }
  }
}
