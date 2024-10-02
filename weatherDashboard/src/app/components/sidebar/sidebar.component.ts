import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { FavouritesService } from '../../favourites.service';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-sidebar',
	standalone: true,
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
	],
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
	@Input() screen: string = 'mobile'


	constructor(public favouriteService: FavouritesService) {

	}


}
