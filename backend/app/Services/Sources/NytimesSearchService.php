<?php
namespace App\Services\Sources;
use GuzzleHttp\Client;

class NytimesSearchService
{
    public function search($keyword, $categories, $from, $limit, $page)
    {
        $client = new Client();
        $limit = round((intval($limit) ?? 10) / 3);
        $page = $page ?? 1;
        $offset = ($page - 1) * $limit;
        $url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
        $params = [
            'api-key' => env('NYTIMES_API_KEY'),
            'q' => $keyword,
            'page' => $page - 1,
            'offset' => $offset
        ];

        if($from) {
            $params['begin_date'] = $from;
        }

        if ($categories) {
            $params['fq'] = 'news_desk:(' . $categories . ')';
        }

        $response = $client->request('GET', $url, ['query' => $params]);
        $data = json_decode($response->getBody(), true);
        $articles = array_slice($data['response']['docs'], 0, $limit);
        $articles = array_values($articles);

        $results = [];

        foreach ($articles as $article) {
            $result = [
                'source' => 'nytimes',
                'title' => $article['headline']['main'],
                'description' => $article['lead_paragraph'],
                'url' => $article['url'],
                'image' => 'http://static01.nyt.com/' . $article['multimedia'][0]['url'],
                'published_at' => $article['pub_date'],
                'content' => null
            ];

            $results[] = $result;
        }

        return $results;
    }
}
