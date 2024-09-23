import { CommonModule } from "@angular/common";
import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() currentPage: number = 1;
  @Input() total: number = 0; 
  @Input() limit: number = 20;
  @Output() changePage = new EventEmitter<number>();

  totalPages: number = 0;
  displayedPages: number[] = [];

  ngOnInit(): void {
    this.totalPages = Math.ceil(this.total / this.limit);
    this.updateDisplayedPages();
  }


  updateDisplayedPages(): void {
    const startPage = Math.max(1, this.currentPage - 2);
    const endPage = Math.min(this.totalPages, startPage + 3); 

    this.displayedPages = [];
    for (let i = startPage; i <= endPage; i++) {
      this.displayedPages.push(i);
    }
  }

 
  onPageClick(page: number): void {
    if (this.currentPage !== page) {
      this.currentPage = page;
      this.changePage.emit(this.currentPage);
      this.updateDisplayedPages();
    }
  }

 
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.changePage.emit(this.currentPage);
      this.updateDisplayedPages();
    }
  }

 
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.changePage.emit(this.currentPage);
      this.updateDisplayedPages();
    }
  }
}