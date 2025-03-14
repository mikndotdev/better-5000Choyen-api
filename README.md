# 5000Choyen
5000兆円欲しい！をnode-canvasを使用しサーバーサイドで生成できるようにしたものを
TypeScriptに書き換えAPI部分を廃止しアプリケーションに組み込めるように変更したものです

# spec
画像形式: PNG (アルファチャンネルあり、背景透明)、JPEG

最大横幅: 3840px

# parameters

|name|value|description|
|----|----|----|
|top|-|上部文字列|
|bottom|-|下部文字列|
|type|png/jpg|PNG/JPEGの切り替え|
|q|-|画質(1～100)|
|hoshii|true/false|下部文字列を「欲しい！」に固定する|
|noalpha|true/false|背景色を白にする|
|rainbow|true/false|虹色にする ※1|
|single|true/false|上部・下部どちらかをレンダリング ※2|

※1：hoshiiが`true`の場合、下部は虹色になりません。

※2：topとbottomを両方指定するとエラーになります。hoshiiは無視されます。

# caution

文字列が短いと横幅が自動で調整されて短くなります。

どんなに長くても3840pxまでしか横幅は伸びません。

# fonts
このジェネレーターは以下のフォントを使用しています。

Noto Sans CJKjp Black

Noto Serif CJKjp Black

これらのフォントはオープンフォントライセンスに基づきGoogle Fontsよりダウンロード可能です。