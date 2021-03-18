import * as vscode from "vscode";

const HTML = `
<!doctype html>
<base href="./">
<html lang="en">

<head>
  <meta charset="utf-8" />
  <title>FOCUS BUG</title>
  <style>
  #root {
    padding: 1rem;
    margin: 1rem;
    border: 1px solid transparent;
  }
  #root.focus {
    border: 1px solid orange;
  }
  p {
    font-size: 1.2rem;
  }
  </style>
</head>

<body>
  <div id='root'>
    <h1>FOCUS BUG</h1>
    <p>Move focus between other panes and this view with shorcut
    (ctrl+0 / ctrl+1) or (cmd+0 / cmd+1).</p>
    <p>After some time, the focus gets totally lost and no keyboard works anymore.</p>
  </div>
  <script src='/boot.js'></script>
</body>

</html>
`;

export class FocusBugProvider implements vscode.CustomTextEditorProvider {
  public static register(context: vscode.ExtensionContext): vscode.Disposable {
    const provider = new FocusBugProvider(context.extensionUri);
    return vscode.window.registerCustomEditorProvider(
      "focusbug.view",
      provider
    );
  }

  constructor(private readonly extensionUri: vscode.Uri) {}

  public async resolveCustomTextEditor(
    _document: vscode.TextDocument,
    panel: vscode.WebviewPanel,
    _token: vscode.CancellationToken
  ): Promise<void> {
    const { webview } = panel;
    webview.options = {
      enableScripts: true,
    };

    const viewUrl = (path: string) =>
      webview.asWebviewUri(
        vscode.Uri.joinPath(this.extensionUri, "view", path)
      );

    webview.html = HTML.replace("/boot.js", viewUrl("boot.js").toString());
  }
}
