import { Persona } from './Persona'

export interface AulaEnCurso{
    id?: number,
    capacidad_actual?: number,
    estado?: number,
    aula_id?: number,
    anio_id?: number,
    usuario_id?: number,
    //pintar
    aula?: string,
    profesor?: string,
    cantidad_estudiantes?: number
}
