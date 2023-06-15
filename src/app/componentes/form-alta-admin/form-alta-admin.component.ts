import { Component } from '@angular/core';
import { SwalService } from 'src/app/services/swal.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Usuario } from 'src/app/clases/usuario';
import { UserService } from 'src/app/services/user.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-form-alta-admin',
  templateUrl: './form-alta-admin.component.html',
  styleUrls: ['./form-alta-admin.component.css']
})
export class FormAltaAdminComponent {
  
  admin : any = new Usuario();
  forma! : FormGroup;
  mostrar : boolean = false;
  titulo : string = "Mostrar listado";
  productos : any;
  recaptchaResponse: string = '';

  resolved(captchaResponse: string) {
    //console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  constructor(private fb : FormBuilder, private userService : UserService, private swal : SwalService, private afstorage : AngularFireStorage){

    this.forma = this.fb.group({
      'nombre': ['', [Validators.required]],
      'apellido': ['', Validators.required],
      'edad': ['', [Validators.required, Validators.min(0), Validators.max(120)]],
      'dni': ['', [Validators.required, Validators.min(1), Validators.max(99999999)]],
      'email': ['', Validators.required],
      'clave': ['', Validators.required]
    });

  }
  //  aceptar(): void {
  //   if(this.forma)
  //   console.log(this.forma.getRawValue());
  // }

  
  registrarAdmin($event : any)
  {
    $event.preventDefault();
    this.admin.perfil = 'admin';
    this.admin.email = this.forma.getRawValue().email;
    this.admin.clave = this.forma.getRawValue().clave;
    this.admin.nombre = this.forma.getRawValue().nombre;
    this.admin.apellido = this.forma.getRawValue().apellido;
    this.admin.edad = this.forma.getRawValue().edad;
    this.admin.dni = this.forma.getRawValue().dni;
    this.admin.especialidad = null;
    this.admin.obraSocial = null;
    this.admin.aprobado = true;
      if (this.validar() && this.recaptchaResponse !== '') {
      this.userService.createUser(this.admin)
        .then(() => {
          console.log("admin registrado");
        })
        .catch((error) => 
        {
          this.swal.swalert("Error", error.code, "error");
          console.log(error.message);
        });
        }
  }


  validar()
  {
    let resultado : boolean = true;
    if (this.admin.nombre === ''||
        this.admin.apellido === ''||
        this.admin.edad === 0 ||
        this.admin.dni ===  0 ||
        this.admin.email ===  '' ||
        this.admin.clave ===  '' ||
        this.admin.imagen1 === '' 
        )
    { 
      resultado = false;
      this.swal.swalert("Error", "Complete todos los campos para registrar", "error");
    }
    console.log(this.admin);
    return resultado;
  }

  async uploadImage($event: any, option: number) {
    const file = $event.target.files[0];
    const path = 'img ' + Date.now() + Math.random() * 10;
    const reference = this.afstorage.ref(path);
    await reference.put(file).then(async () => {
      await reference.getDownloadURL().subscribe((urlImg) => {
        if (option == 1) {
          this.admin.imagen1 = urlImg;
        } else if (option == 2) {
          this.admin.imagen2 = urlImg;
        }
      });
    });
  }
}
