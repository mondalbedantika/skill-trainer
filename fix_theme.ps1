Get-ChildItem -Path "c:\Users\monda\OneDrive\Desktop\Proj 1\src\components" -Filter "*.tsx" -Recurse | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $content = $content -replace 'bg-slate-950/80', 'bg-background/80'
    $content = $content -replace 'bg-slate-950/70', 'bg-background/70'
    $content = $content -replace 'bg-slate-950', 'bg-background'
    $content = $content -replace 'bg-slate-900/90', 'bg-surface-low'
    $content = $content -replace 'bg-slate-900', 'bg-surface-low'
    $content = $content -replace 'from-slate-950', 'from-background'
    $content = $content -replace 'via-slate-950/20', 'via-background/20'
    $content = $content -replace 'via-slate-950', 'via-background'
    $content = $content -replace 'text-slate-300', 'text-text-secondary'
    $content = $content -replace 'text-slate-400', 'text-text-muted'
    $content = $content -replace 'text-slate-200', 'text-text-secondary'
    $content = $content -replace 'hover:text-text-text-primary', 'hover:text-text-primary'
    Set-Content $_.FullName -Value $content -NoNewline
    Write-Host "Updated: $($_.Name)"
}
