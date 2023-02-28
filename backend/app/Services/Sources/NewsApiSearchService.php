<?php
namespace App\Services\Sources;

use GuzzleHttp\Client;

class NewsApiSearchService
{
    public function search($keyword, $categories, $from, $language, $limit, $page)
    {
        $client = new Client();
        $url = 'https://newsapi.org/v2/everything';
        $params = [
            'apiKey' => env('NEWSAPI_API_KEY'),
            'language' => $language,
            'pageSize' => $limit,
            'page' => $page
        ];
    
        if ($categories) {
            $params['category'] = $categories;
        }
        if ($keyword) {
            $params['q'] = $keyword;
        } else {
            $params['q'] = 'latest';
        }
    
        if ($from) {
            $params['from'] = $from;
        }
    
        $response = $client->request('GET', $url, ['query' => $params]);
        $data = json_decode($response->getBody(), true);
        $articles = $data['articles'];
    
        $results = [];
    
        foreach ($articles as $article) {
            $result = [
                'source' => 'newsapi',
                'title' => $article['title'],
                'description' => $article['description'],
                'url' => $article['url'],
                'image' => $article['urlToImage'],
                'published_at' => $article['publishedAt'],
                'content' => $article['content']
            ];
    
            $results[] = $result;
        }
    
        return $results;
    }   
}