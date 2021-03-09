import { Usuario } from './Usuario';

export interface AulaEnCursoEstudiante{
    id?: number,
    aula_anio_id?: number,
    estudiante_id?: Array<Usuario>,
    estado?: number,
    //pintar
    
    estudiante?: string,
    dni?: string,
    sexo?: string,
    celular?: string,
    telefono?: string,
    fecha_nacimiento?: string,
    email?: string,
    foto?: string
}
