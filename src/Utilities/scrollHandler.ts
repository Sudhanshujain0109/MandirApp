export function isScrollviewCloseToBottom({layoutMeasurement,contentOffset,contentSize}:any) {
    const paddingToBottom = 10;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
}