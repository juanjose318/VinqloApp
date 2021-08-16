import { Category } from './../../core/models/category';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from './../../core/services/common.service';
import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import { CommunityListComponent } from 'src/app/shared/community/community-list/community-list.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit, OnChanges {
  public sortType: number =0;

  sortTypes = [
    { id: 1, name: 'Trending' },
    { id: 0, name: 'Newest' },
  ];
  academicesPath = '/communities/get/academics';
  slug!: string;
  searchQuery: string = '';

  @ViewChild(CommunityListComponent) communityListComponent!: CommunityListComponent;

  constructor(
    private route: ActivatedRoute,
    private commonService: CommonService
  ) {}
  isLoader = false;

  ngOnChanges() {}
  ngOnInit(): void {
    this.get();
  }
  get categories() {
    return this.commonService.categories();
  }
  get title() {
    return this.categories.find((e) => e.slug == this.slug);
  }

  get() {
    this.route.params.subscribe((res) => {
      this.slug = res['slug'];
    });
  }
  onCreateCommuntiy(cat: any) {
    if(cat.category === this.slug) {
      this.communityListComponent.get()
    }
  }
}
