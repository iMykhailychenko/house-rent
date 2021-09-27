import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

type Links = 'ru' | 'ua';
export interface Translations {
    id: string;
    content: string;
}

@Injectable({
    providedIn: 'root',
})
export class TranslationsPageService {
    baseUrl = '/admin/api/v1/translations/';
    language: Links = 'ua';

    data: MatTableDataSource<Translations> =
        new MatTableDataSource<Translations>([]);

    constructor(private http: HttpClient) {}

    setLang(lang: Links): void {
        this.language = lang;
    }

    getContent(): void {
        this.http
            .get<Translations>(this.baseUrl + this.language)
            .subscribe((res) => {
                this.data.data = res
                    ? Object.entries(res)
                          .map<Translations>((item) => ({
                              id: item[0],
                              content: item[1],
                          }))
                          .reverse()
                    : [];
            });
    }

    updateContent(value: Translations): Observable<Translations> {
        return this.http.put<Translations>(this.baseUrl + this.language, value);
    }

    addContent(value: Translations): Observable<Translations> {
        return this.http.post<Translations>(this.baseUrl, value);
    }

    deleteContent(id: string): Observable<Translations> {
        return this.http.delete<Translations>(this.baseUrl + id);
    }
}
