import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-bug-filter',
  templateUrl: './bug-filter.component.html',
  styleUrls: ['./bug-filter.component.scss'],
})
export class BugFilterComponent {
  @Output() filtersChanged = new EventEmitter<any>();

  searchTerm: string = '';
  selectedCategory: string = '';
  selectedTechStack: string = '';

  categories: string[] = ['Low', 'Medium', 'High'];
  techStacks: string[] = ['Java', 'Python', 'Angular', 'React'];

  applyFilters() {
    this.filtersChanged.emit({
      search: this.searchTerm,
      category: this.selectedCategory,
      techStack: this.selectedTechStack,
    });
  }
}

