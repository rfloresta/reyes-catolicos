import { Img } from 'pdfmake-wrapper';

export interface SesionInforme{
    area?: string,
    tema?: string,
    actividad: string,
    retro: any,
    pasos?: any,   
    numero?: number,
    competencia?: string,
    fecha_inicio?: string,
    fecha_fin?: string 
}
