import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../providers/auth.service';
import { TabsComponent } from '../../components/tabs/tabs';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginPage {

  form:FormGroup;
  warning:string;

  constructor(public authService:AuthService, public navCtrl:NavController) {

    this.form = new FormGroup({
      'password': new FormControl(''),
      'username': new FormControl(''),
    })
   
  }

  loginForm(){
    if(this.form.get("username").value != "" && this.form.get("password").value != ""){

      let username = this.form.get("username").value
      let password = this.form.get("password").value

      this.authService.sendData(username,password).subscribe(
        (response)=>{

          if(response.error != null){
            return;
          }
          if(response.data[0].status == false){
            this.warning = "La contraseña es invalida"
            this.form.reset({
              password:"",
            });
            localStorage.setItem("user_id","1");
            this.navCtrl.push(TabsComponent);
            return;
          }else{
            this.navCtrl.push(TabsComponent);
          }
        } ,
        (error) =>{
          this.warning = "El nombre de usuario no existe"
          this.form.reset({
            password:"",
          });
        }
      )
    }else{
      this.warning = "Debes completar el nombre de usuario y contraseña"
    }
  }

}
