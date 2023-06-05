import { Role } from '../enums/rol.enum';
import { ISidebar } from '../interfaces/ISidebar.interface';

export const sidebarItems: ISidebar[]  = [
    {
        title: 'Eventos',
        icon: 'pi pi-file',
        roles: [Role.ADMIN, Role.ENCARGADO],
        link: ['/admin/dashboard/eventos']
    },

]


