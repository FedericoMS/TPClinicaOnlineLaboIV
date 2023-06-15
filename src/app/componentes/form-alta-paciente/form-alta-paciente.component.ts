import { Component } from '@angular/core';
import { SwalService } from 'src/app/services/swal.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Usuario } from 'src/app/clases/usuario';
import { UserService } from 'src/app/services/user.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-form-alta-paciente',
  templateUrl: './form-alta-paciente.component.html',
  styleUrls: ['./form-alta-paciente.component.css']
})
export class FormAltaPacienteComponent {
  paciente : any = new Usuario();
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
      'obraSocial': ['', Validators.required],
      'email': ['', Validators.required],
      'clave': ['', Validators.required]
    });

  }
  //  aceptar(): void {
  //   if(this.forma)
  //   console.log(this.forma.getRawValue());
  // }

  
  registrarPaciente($event : any)
  {
    $event.preventDefault();
    this.paciente.perfil = 'paciente';
    this.paciente.email = this.forma.getRawValue().email;
    this.paciente.clave = this.forma.getRawValue().clave;
    this.paciente.nombre = this.forma.getRawValue().nombre;
    this.paciente.apellido = this.forma.getRawValue().apellido;
    this.paciente.edad = this.forma.getRawValue().edad;
    this.paciente.dni = this.forma.getRawValue().dni;
    this.paciente.obraSocial = this.forma.getRawValue().obraSocial;
    this.paciente.especialidad = null;    
    // const newPatient : Usuario = this.paciente;
      if (this.validar() && this.recaptchaResponse !== '') {
      this.userService.createUser(this.paciente)
        .then(() => {
          console.log("paciente registrado");
          this.forma.reset();
         // this.swal.swalert("Registro", "Paciente registrado!", "success");
         // this.resetForm();
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
    if (this.paciente.nombre === ''||
        this.paciente.apellido === ''||
        this.paciente.edad === 0 ||
        this.paciente.dni ===  0 ||
        this.paciente.obraSocial ===  '' ||
        this.paciente.email ===  '' ||
        this.paciente.clave ===  '' ||
        this.paciente.imagen1 === '' ||
        this.paciente.imagen2 === '' 
        )
    { 
      resultado = false;
      this.swal.swalert("Error", "Complete todos los campos para registrar", "error");
    }
    console.log(this.paciente);
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
          this.paciente.imagen1 = urlImg;
        } else if (option == 2) {
          this.paciente.imagen2 = urlImg;
        }
      });
    });
  }



}
