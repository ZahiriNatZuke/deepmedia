import {Component, Input, OnInit} from '@angular/core';
import {
  faAtom,
  faGamepad,
  faHashtag,
  faLightbulb,
  faMusic,
  faSmileWink,
  faUserGraduate
} from '@fortawesome/free-solid-svg-icons';
import {IconDefinition} from '@fortawesome/fontawesome-common-types';

@Component({
  selector: 'app-category-chip',
  templateUrl: './category-chip.component.html',
  styleUrls: ['./category-chip.component.scss']
})
export class CategoryChipComponent implements OnInit {
  @Input() Category: string;
  @Input() SizeIcon: number;
  @Input() Padding: number[];
  currentChip: IconDefinition;
  faGamepad = faGamepad;
  faMusic = faMusic;
  faAtom = faAtom;
  faLightbulb = faLightbulb;
  faSmileWink = faSmileWink;
  faUserGraduate = faUserGraduate;
  faHashtag = faHashtag;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.Category);
    switch (this.Category) {
      case 'Gameplay':
        this.currentChip = this.faGamepad;
        break;
      case 'Musical':
        this.currentChip = this.faMusic;
        break;
      case 'Joke':
        this.currentChip = this.faSmileWink;
        break;
      case 'Tech':
        this.currentChip = this.faAtom;
        break;
      case 'Interesting':
        this.currentChip = this.faLightbulb;
        break;
      case 'Tutorial':
        this.currentChip = this.faUserGraduate;
        break;
      default:
        this.currentChip = this.faHashtag;
        break;
    }
  }

}
