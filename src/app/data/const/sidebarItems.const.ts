import { Role } from '../enums/rol.enum';
import { ISidebar } from '../interfaces/ISidebar.interface';

export const sidebarItems: ISidebar[]  = [
    {
        title: 'Eventos',
        icon: 'pi pi-file',
        roles: [Role.ADMIN, Role.ENCARGADO],
        link: ['/admin/eventos-list']
    },
    {
        title: 'Funcionarios',
        icon: 'pi pi-users',
        roles: [Role.ADMIN],
        link: ['/admin/funcionarios']
    },

]


