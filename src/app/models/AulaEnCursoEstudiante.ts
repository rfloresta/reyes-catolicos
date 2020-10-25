import { Usuario } from './Usuario';

export interface AulaEnCursoEstudiante{
    id?: number,
    aula_anio_id?: number,
    estudiante_id?: Array<Usuario>,
    estado?: number,
    //pintar
    estudiante?: string
    email?: string,
    foto?: string
}
