import { CommonModule, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild, isStandalone } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TimeagoModule } from 'ngx-timeago';
import { Message } from 'src/app/_models/message';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  changeDetection:ChangeDetectionStrategy.OnPush,
  selector: 'app-member-messages',
  standalone:true,
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css'],
  imports:[CommonModule,TimeagoModule,FormsModule]
})
export class MemberMessagesComponent implements OnInit{
  @Input() username?:string;
  messageContent='';
  @ViewChild('messageForm') messageForm?:NgForm;

  constructor(public messageService:MessageService) {
    
    
  }
  ngOnInit(): void {
  }

  sendMessage(){
    if(!this.username)
      return;
    this.messageService.sendMessage(this.username,this.messageContent).then(()=>{
      this.messageForm?.reset();
    })
    }
  }
