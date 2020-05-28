import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../services/authentication.service';
import {faList} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-secret-list',
  templateUrl: './secret-list.component.html',
  styleUrls: ['./secret-list.component.scss']
})
export class SecretListComponent implements OnInit, OnDestroy {

  secret_list: [];
  faList = faList;
  checked: boolean;
  show: boolean;

  constructor(private authenticationService: AuthenticationService) {
    this.show = false;
    this.authenticationService.GETForSecretList().subscribe(response => {
      this.secret_list = response.secret_list;
      this.show = true;
    });
  }

  ngOnInit(): void {
  }

  sendData() {
    this.authenticationService.POSTForStoreUserAndSecretList(this.secret_list);
  }

  ngOnDestroy(): void {
    if (!this.checked)
      sessionStorage.clear();
  }
}
