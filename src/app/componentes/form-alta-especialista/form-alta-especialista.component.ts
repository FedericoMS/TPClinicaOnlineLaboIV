import { Component } from '@angular/core';
import { SwalService } from 'src/app/services/swal.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Usuario } from 'src/app/clases/usuario';
import { UserService } from 'src/app/services/user.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Component({
  selector: 'app-form-alta-especialista',
  templateUrl: './form-alta-especialista.component.html',
  styleUrls: ['./form-alta-especialista.component.css']
})
export class FormAltaEspecialistaComponent {

  especialista : any = new Usuario();
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
      'especialidad': ['', Validators.required],
      'email': ['', Validators.required],
      'clave': ['', Validators.required]
    });

  }
  //  aceptar(): void {
  //   if(this.forma)
  //   console.log(this.forma.getRawValue());
  // }

  
  registrarEspecialista($event : any)
  {
    $event.preventDefault();
    this.especialista.perfil = 'especialista';
    this.especialista.email = this.forma.getRawValue().email;
    this.especialista.clave = this.forma.getRawValue().clave;
    this.especialista.nombre = this.forma.getRawValue().nombre;
    this.especialista.apellido = this.forma.getRawValue().apellido;
    this.especialista.edad = this.forma.getRawValue().edad;
    this.especialista.dni = this.forma.getRawValue().dni;
    this.especialista.especialidad = this.forma.getRawValue().especialidad;
    this.especialista.obraSocial = null;
      if (this.validar() && this.recaptchaResponse !== '') {
      this.userService.createUser(this.especialista)
        .then(() => {
          console.log("especialista registrado");
          this.forma.reset();
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
    if (this.especialista.nombre === ''||
        this.especialista.apellido === ''||
        this.especialista.edad === 0 ||
        this.especialista.dni ===  0 ||
        this.especialista.especialidad ===  '' ||
        this.especialista.email ===  '' ||
        this.especialista.clave ===  '' ||
        this.especialista.imagen1 === ''
        )
    { 
      resultado = false;
      this.swal.swalert("Error", "Complete todos los campos para registrar", "error");
    }
    console.log(this.especialista);
    return resultado;
  }

  async uploadImage($event: any, option: number) {
    console.log("hola soy una imagen")
    // this.spinner = true;
    const file = $event.target.files[0];
    const path = 'img ' + Date.now() + Math.random() * 10;
    const reference = this.afstorage.ref(path);
    await reference.put(file).then(async () => {
      await reference.getDownloadURL().subscribe((urlImg) => {
        // this.spinner = false;
        if (option == 1) {
          this.especialista.imagen1 = urlImg;
        } else if (option == 2) {
          this.especialista.imagen2 = urlImg;
        }
      });
    });
  }



}
