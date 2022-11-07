export const CanvasSkin = (params: { item: string }) => {
  const skinItem = params.item;

  const DropperIcon = (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 70"
      height="2em"
    >
      <defs>
        <style>.cls-1&#123;fill:#0274fe;&#125;</style>
      </defs>
      <rect className="cls-1" x="20" y="60" width="10" height="10" />
      <polygon
        className="cls-1"
        points="40 20 40 10 30 10 30 0 20 0 20 10 10 10 10 20 0 20 0 30 10 30 10 40 10 50 10 60 20 60 20 50 20 40 20 30 30 30 30 40 30 50 30 60 40 60 40 50 40 40 40 30 50 30 50 20 40 20"
      />
    </svg>
  );
  const DropperIconActive = (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 70"
      height="2em"
    >
      <defs>
        <style>.cls-icon-active&#123;fill:#6effff;&#125;</style>
      </defs>
      <rect className="cls-icon-active" x="20" y="60" width="10" height="10" />
      <polygon
        className="cls-icon-active"
        points="40 20 40 10 30 10 30 0 20 0 20 10 10 10 10 20 0 20 0 30 10 30 10 40 10 50 10 60 20 60 20 50 20 40 20 30 30 30 30 40 30 50 30 60 40 60 40 50 40 40 40 30 50 30 50 20 40 20"
      />
    </svg>
  );

  const MoveUpIcon = (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -20 50 70"
      width="1.5em"
    >
      <defs>
        <style>.cls-up&#123;fill:#0274fe;&#125;</style>
      </defs>
      <rect className="cls-up" y="20" width="10" height="10" />
      <rect className="cls-up" x="10" y="10" width="10" height="10" />
      <rect className="cls-up" x="20" width="10" height="10" />
      <rect className="cls-up" x="30" y="10" width="10" height="10" />
      <rect className="cls-up" x="40" y="20" width="10" height="10" />
    </svg>
  );

  const MoveDownIcon = (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -25 50 70"
      width="1.5em"
    >
      <defs>
        <style>.cls-1&#123;fill:#0274fe;&#125;</style>
      </defs>
      <rect className="cls-1" x="40" width="10" height="10" />
      <rect className="cls-1" x="30" y="10" width="10" height="10" />
      <rect className="cls-1" x="20" y="20" width="10" height="10" />
      <rect className="cls-1" x="10" y="10" width="10" height="10" />
      <rect className="cls-1" width="10" height="10" />
    </svg>
  );

  const MoveLeftIcon = (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-5 -15 50 70"
      width="1.5em"
    >
      <defs>
        <style>.cls-1&#123;fill:#0274fe;&#125;</style>
      </defs>
      <rect className="cls-1" x="20" y="40" width="10" height="10" />
      <rect className="cls-1" x="10" y="30" width="10" height="10" />
      <rect className="cls-1" y="20" width="10" height="10" />
      <rect className="cls-1" x="10" y="10" width="10" height="10" />
      <rect className="cls-1" x="20" width="10" height="10" />
    </svg>
  );

  const MoveRightIcon = (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-10 -15 50 70"
      width="1.5em"
    >
      <defs>
        <style>.cls-1&#123;fill:#0274fe;&#125;</style>
      </defs>
      <rect className="cls-1" width="10" height="10" />
      <rect className="cls-1" x="10" y="10" width="10" height="10" />
      <rect className="cls-1" x="20" y="20" width="10" height="10" />
      <rect className="cls-1" x="10" y="30" width="10" height="10" />
      <rect className="cls-1" y="40" width="10" height="10" />
    </svg>
  );

  const AddPaletteItemIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      version="1.1"
      viewBox="0 0 240 240"
      className="h-8"
    >
      <g transform="scale(16 16)">
        <rect fill="#F8FAFC" x="0" y="0" height="1" width="1" />
        <rect fill="#F8FAFC" x="1" y="0" height="1" width="1" />
        <rect fill="#F8FAFC" x="2" y="0" height="1" width="1" />
        <rect fill="#F8FAFC" x="3" y="0" height="1" width="1" />
        <rect fill="#F8FAFC" x="4" y="0" height="1" width="1" />
        <rect fill="#F8FAFC" x="5" y="0" height="1" width="1" />
        <rect fill="#F8FAFC" x="6" y="0" height="1" width="1" />
        <rect fill="#F8FAFC" x="7" y="0" height="1" width="1" />
        <rect fill="#F8FAFC" x="8" y="0" height="1" width="1" />
        <rect fill="#F8FAFC" x="9" y="0" height="1" width="1" />
        <rect fill="#F8FAFC" x="10" y="0" height="1" width="1" />
        <rect fill="#F8FAFC" x="11" y="0" height="1" width="1" />
        <rect fill="#F8FAFC" x="12" y="0" height="1" width="1" />
        <rect fill="#F8FAFC" x="13" y="0" height="1" width="1" />
        <rect fill="#F8FAFC" x="14" y="0" height="1" width="1" />
        <rect fill="#F8FAFC" x="0" y="1" height="1" width="1" />
        <rect fill="#F8FAFC" x="1" y="1" height="1" width="1" />
        <rect fill="#F8FAFC" x="2" y="1" height="1" width="1" />
        <rect fill="#F8FAFC" x="3" y="1" height="1" width="1" />
        <rect fill="#F8FAFC" x="4" y="1" height="1" width="1" />
        <rect fill="#F8FAFC" x="5" y="1" height="1" width="1" />
        <rect fill="#F8FAFC" x="6" y="1" height="1" width="1" />
        <rect fill="#F8FAFC" x="7" y="1" height="1" width="1" />
        <rect fill="#F8FAFC" x="8" y="1" height="1" width="1" />
        <rect fill="#F8FAFC" x="9" y="1" height="1" width="1" />
        <rect fill="#F8FAFC" x="10" y="1" height="1" width="1" />
        <rect fill="#F8FAFC" x="11" y="1" height="1" width="1" />
        <rect fill="#F8FAFC" x="12" y="1" height="1" width="1" />
        <rect fill="#F8FAFC" x="13" y="1" height="1" width="1" />
        <rect fill="#F8FAFC" x="14" y="1" height="1" width="1" />
        <rect fill="#F8FAFC" x="0" y="2" height="1" width="1" />
        <rect fill="#F8FAFC" x="1" y="2" height="1" width="1" />
        <rect fill="#F8FAFC" x="2" y="2" height="1" width="1" />
        <rect fill="#F8FAFC" x="3" y="2" height="1" width="1" />
        <rect fill="#F8FAFC" x="4" y="2" height="1" width="1" />
        <rect fill="#F8FAFC" x="5" y="2" height="1" width="1" />
        <rect fill="#F8FAFC" x="6" y="2" height="1" width="1" />
        <rect fill="#0EA5E9" x="7" y="2" height="1" width="1" />
        <rect fill="#F8FAFC" x="8" y="2" height="1" width="1" />
        <rect fill="#F8FAFC" x="9" y="2" height="1" width="1" />
        <rect fill="#F8FAFC" x="10" y="2" height="1" width="1" />
        <rect fill="#F8FAFC" x="11" y="2" height="1" width="1" />
        <rect fill="#F8FAFC" x="12" y="2" height="1" width="1" />
        <rect fill="#F8FAFC" x="13" y="2" height="1" width="1" />
        <rect fill="#F8FAFC" x="14" y="2" height="1" width="1" />
        <rect fill="#F8FAFC" x="0" y="3" height="1" width="1" />
        <rect fill="#F8FAFC" x="1" y="3" height="1" width="1" />
        <rect fill="#F8FAFC" x="2" y="3" height="1" width="1" />
        <rect fill="#F8FAFC" x="3" y="3" height="1" width="1" />
        <rect fill="#F8FAFC" x="4" y="3" height="1" width="1" />
        <rect fill="#F8FAFC" x="5" y="3" height="1" width="1" />
        <rect fill="#F8FAFC" x="6" y="3" height="1" width="1" />
        <rect fill="#0EA5E9" x="7" y="3" height="1" width="1" />
        <rect fill="#F8FAFC" x="8" y="3" height="1" width="1" />
        <rect fill="#F8FAFC" x="9" y="3" height="1" width="1" />
        <rect fill="#F8FAFC" x="10" y="3" height="1" width="1" />
        <rect fill="#F8FAFC" x="11" y="3" height="1" width="1" />
        <rect fill="#F8FAFC" x="12" y="3" height="1" width="1" />
        <rect fill="#F8FAFC" x="13" y="3" height="1" width="1" />
        <rect fill="#F8FAFC" x="14" y="3" height="1" width="1" />
        <rect fill="#F8FAFC" x="0" y="4" height="1" width="1" />
        <rect fill="#F8FAFC" x="1" y="4" height="1" width="1" />
        <rect fill="#F8FAFC" x="2" y="4" height="1" width="1" />
        <rect fill="#F8FAFC" x="3" y="4" height="1" width="1" />
        <rect fill="#F8FAFC" x="4" y="4" height="1" width="1" />
        <rect fill="#F8FAFC" x="5" y="4" height="1" width="1" />
        <rect fill="#F8FAFC" x="6" y="4" height="1" width="1" />
        <rect fill="#0EA5E9" x="7" y="4" height="1" width="1" />
        <rect fill="#F8FAFC" x="8" y="4" height="1" width="1" />
        <rect fill="#F8FAFC" x="9" y="4" height="1" width="1" />
        <rect fill="#F8FAFC" x="10" y="4" height="1" width="1" />
        <rect fill="#F8FAFC" x="11" y="4" height="1" width="1" />
        <rect fill="#F8FAFC" x="12" y="4" height="1" width="1" />
        <rect fill="#F8FAFC" x="13" y="4" height="1" width="1" />
        <rect fill="#F8FAFC" x="14" y="4" height="1" width="1" />
        <rect fill="#F8FAFC" x="0" y="5" height="1" width="1" />
        <rect fill="#F8FAFC" x="1" y="5" height="1" width="1" />
        <rect fill="#F8FAFC" x="2" y="5" height="1" width="1" />
        <rect fill="#F8FAFC" x="3" y="5" height="1" width="1" />
        <rect fill="#F8FAFC" x="4" y="5" height="1" width="1" />
        <rect fill="#F8FAFC" x="5" y="5" height="1" width="1" />
        <rect fill="#F8FAFC" x="6" y="5" height="1" width="1" />
        <rect fill="#0EA5E9" x="7" y="5" height="1" width="1" />
        <rect fill="#F8FAFC" x="8" y="5" height="1" width="1" />
        <rect fill="#F8FAFC" x="9" y="5" height="1" width="1" />
        <rect fill="#F8FAFC" x="10" y="5" height="1" width="1" />
        <rect fill="#F8FAFC" x="11" y="5" height="1" width="1" />
        <rect fill="#F8FAFC" x="12" y="5" height="1" width="1" />
        <rect fill="#F8FAFC" x="13" y="5" height="1" width="1" />
        <rect fill="#F8FAFC" x="14" y="5" height="1" width="1" />
        <rect fill="#F8FAFC" x="0" y="6" height="1" width="1" />
        <rect fill="#F8FAFC" x="1" y="6" height="1" width="1" />
        <rect fill="#F8FAFC" x="2" y="6" height="1" width="1" />
        <rect fill="#F8FAFC" x="3" y="6" height="1" width="1" />
        <rect fill="#F8FAFC" x="4" y="6" height="1" width="1" />
        <rect fill="#F8FAFC" x="5" y="6" height="1" width="1" />
        <rect fill="#F8FAFC" x="6" y="6" height="1" width="1" />
        <rect fill="#0EA5E9" x="7" y="6" height="1" width="1" />
        <rect fill="#F8FAFC" x="8" y="6" height="1" width="1" />
        <rect fill="#F8FAFC" x="9" y="6" height="1" width="1" />
        <rect fill="#F8FAFC" x="10" y="6" height="1" width="1" />
        <rect fill="#F8FAFC" x="11" y="6" height="1" width="1" />
        <rect fill="#F8FAFC" x="12" y="6" height="1" width="1" />
        <rect fill="#F8FAFC" x="13" y="6" height="1" width="1" />
        <rect fill="#F8FAFC" x="14" y="6" height="1" width="1" />
        <rect fill="#F8FAFC" x="0" y="7" height="1" width="1" />
        <rect fill="#F8FAFC" x="1" y="7" height="1" width="1" />
        <rect fill="#0EA5E9" x="2" y="7" height="1" width="1" />
        <rect fill="#0EA5E9" x="3" y="7" height="1" width="1" />
        <rect fill="#0EA5E9" x="4" y="7" height="1" width="1" />
        <rect fill="#0EA5E9" x="5" y="7" height="1" width="1" />
        <rect fill="#0EA5E9" x="6" y="7" height="1" width="1" />
        <rect fill="#0EA5E9" x="7" y="7" height="1" width="1" />
        <rect fill="#0EA5E9" x="8" y="7" height="1" width="1" />
        <rect fill="#0EA5E9" x="9" y="7" height="1" width="1" />
        <rect fill="#0EA5E9" x="10" y="7" height="1" width="1" />
        <rect fill="#0EA5E9" x="11" y="7" height="1" width="1" />
        <rect fill="#0EA5E9" x="12" y="7" height="1" width="1" />
        <rect fill="#F8FAFC" x="13" y="7" height="1" width="1" />
        <rect fill="#F8FAFC" x="14" y="7" height="1" width="1" />
        <rect fill="#F8FAFC" x="0" y="8" height="1" width="1" />
        <rect fill="#F8FAFC" x="1" y="8" height="1" width="1" />
        <rect fill="#F8FAFC" x="2" y="8" height="1" width="1" />
        <rect fill="#F8FAFC" x="3" y="8" height="1" width="1" />
        <rect fill="#F8FAFC" x="4" y="8" height="1" width="1" />
        <rect fill="#F8FAFC" x="5" y="8" height="1" width="1" />
        <rect fill="#F8FAFC" x="6" y="8" height="1" width="1" />
        <rect fill="#0EA5E9" x="7" y="8" height="1" width="1" />
        <rect fill="#F8FAFC" x="8" y="8" height="1" width="1" />
        <rect fill="#F8FAFC" x="9" y="8" height="1" width="1" />
        <rect fill="#F8FAFC" x="10" y="8" height="1" width="1" />
        <rect fill="#F8FAFC" x="11" y="8" height="1" width="1" />
        <rect fill="#F8FAFC" x="12" y="8" height="1" width="1" />
        <rect fill="#F8FAFC" x="13" y="8" height="1" width="1" />
        <rect fill="#F8FAFC" x="14" y="8" height="1" width="1" />
        <rect fill="#F8FAFC" x="0" y="9" height="1" width="1" />
        <rect fill="#F8FAFC" x="1" y="9" height="1" width="1" />
        <rect fill="#F8FAFC" x="2" y="9" height="1" width="1" />
        <rect fill="#F8FAFC" x="3" y="9" height="1" width="1" />
        <rect fill="#F8FAFC" x="4" y="9" height="1" width="1" />
        <rect fill="#F8FAFC" x="5" y="9" height="1" width="1" />
        <rect fill="#F8FAFC" x="6" y="9" height="1" width="1" />
        <rect fill="#0EA5E9" x="7" y="9" height="1" width="1" />
        <rect fill="#F8FAFC" x="8" y="9" height="1" width="1" />
        <rect fill="#F8FAFC" x="9" y="9" height="1" width="1" />
        <rect fill="#F8FAFC" x="10" y="9" height="1" width="1" />
        <rect fill="#F8FAFC" x="11" y="9" height="1" width="1" />
        <rect fill="#F8FAFC" x="12" y="9" height="1" width="1" />
        <rect fill="#F8FAFC" x="13" y="9" height="1" width="1" />
        <rect fill="#F8FAFC" x="14" y="9" height="1" width="1" />
        <rect fill="#F8FAFC" x="0" y="10" height="1" width="1" />
        <rect fill="#F8FAFC" x="1" y="10" height="1" width="1" />
        <rect fill="#F8FAFC" x="2" y="10" height="1" width="1" />
        <rect fill="#F8FAFC" x="3" y="10" height="1" width="1" />
        <rect fill="#F8FAFC" x="4" y="10" height="1" width="1" />
        <rect fill="#F8FAFC" x="5" y="10" height="1" width="1" />
        <rect fill="#F8FAFC" x="6" y="10" height="1" width="1" />
        <rect fill="#0EA5E9" x="7" y="10" height="1" width="1" />
        <rect fill="#F8FAFC" x="8" y="10" height="1" width="1" />
        <rect fill="#F8FAFC" x="9" y="10" height="1" width="1" />
        <rect fill="#F8FAFC" x="10" y="10" height="1" width="1" />
        <rect fill="#F8FAFC" x="11" y="10" height="1" width="1" />
        <rect fill="#F8FAFC" x="12" y="10" height="1" width="1" />
        <rect fill="#F8FAFC" x="13" y="10" height="1" width="1" />
        <rect fill="#F8FAFC" x="14" y="10" height="1" width="1" />
        <rect fill="#F8FAFC" x="0" y="11" height="1" width="1" />
        <rect fill="#F8FAFC" x="1" y="11" height="1" width="1" />
        <rect fill="#F8FAFC" x="2" y="11" height="1" width="1" />
        <rect fill="#F8FAFC" x="3" y="11" height="1" width="1" />
        <rect fill="#F8FAFC" x="4" y="11" height="1" width="1" />
        <rect fill="#F8FAFC" x="5" y="11" height="1" width="1" />
        <rect fill="#F8FAFC" x="6" y="11" height="1" width="1" />
        <rect fill="#0EA5E9" x="7" y="11" height="1" width="1" />
        <rect fill="#F8FAFC" x="8" y="11" height="1" width="1" />
        <rect fill="#F8FAFC" x="9" y="11" height="1" width="1" />
        <rect fill="#F8FAFC" x="10" y="11" height="1" width="1" />
        <rect fill="#F8FAFC" x="11" y="11" height="1" width="1" />
        <rect fill="#F8FAFC" x="12" y="11" height="1" width="1" />
        <rect fill="#F8FAFC" x="13" y="11" height="1" width="1" />
        <rect fill="#F8FAFC" x="14" y="11" height="1" width="1" />
        <rect fill="#F8FAFC" x="0" y="12" height="1" width="1" />
        <rect fill="#F8FAFC" x="1" y="12" height="1" width="1" />
        <rect fill="#F8FAFC" x="2" y="12" height="1" width="1" />
        <rect fill="#F8FAFC" x="3" y="12" height="1" width="1" />
        <rect fill="#F8FAFC" x="4" y="12" height="1" width="1" />
        <rect fill="#F8FAFC" x="5" y="12" height="1" width="1" />
        <rect fill="#F8FAFC" x="6" y="12" height="1" width="1" />
        <rect fill="#0EA5E9" x="7" y="12" height="1" width="1" />
        <rect fill="#F8FAFC" x="8" y="12" height="1" width="1" />
        <rect fill="#F8FAFC" x="9" y="12" height="1" width="1" />
        <rect fill="#F8FAFC" x="10" y="12" height="1" width="1" />
        <rect fill="#F8FAFC" x="11" y="12" height="1" width="1" />
        <rect fill="#F8FAFC" x="12" y="12" height="1" width="1" />
        <rect fill="#F8FAFC" x="13" y="12" height="1" width="1" />
        <rect fill="#F8FAFC" x="14" y="12" height="1" width="1" />
        <rect fill="#F8FAFC" x="0" y="13" height="1" width="1" />
        <rect fill="#F8FAFC" x="1" y="13" height="1" width="1" />
        <rect fill="#F8FAFC" x="2" y="13" height="1" width="1" />
        <rect fill="#F8FAFC" x="3" y="13" height="1" width="1" />
        <rect fill="#F8FAFC" x="4" y="13" height="1" width="1" />
        <rect fill="#F8FAFC" x="5" y="13" height="1" width="1" />
        <rect fill="#F8FAFC" x="6" y="13" height="1" width="1" />
        <rect fill="#0EA5E9" x="7" y="13" height="1" width="1" />
        <rect fill="#F8FAFC" x="8" y="13" height="1" width="1" />
        <rect fill="#F8FAFC" x="9" y="13" height="1" width="1" />
        <rect fill="#F8FAFC" x="10" y="13" height="1" width="1" />
        <rect fill="#F8FAFC" x="11" y="13" height="1" width="1" />
        <rect fill="#F8FAFC" x="12" y="13" height="1" width="1" />
        <rect fill="#F8FAFC" x="13" y="13" height="1" width="1" />
        <rect fill="#F8FAFC" x="14" y="13" height="1" width="1" />
        <rect fill="#F8FAFC" x="0" y="14" height="1" width="1" />
        <rect fill="#F8FAFC" x="1" y="14" height="1" width="1" />
        <rect fill="#F8FAFC" x="2" y="14" height="1" width="1" />
        <rect fill="#F8FAFC" x="3" y="14" height="1" width="1" />
        <rect fill="#F8FAFC" x="4" y="14" height="1" width="1" />
        <rect fill="#F8FAFC" x="5" y="14" height="1" width="1" />
        <rect fill="#F8FAFC" x="6" y="14" height="1" width="1" />
        <rect fill="#F8FAFC" x="7" y="14" height="1" width="1" />
        <rect fill="#F8FAFC" x="8" y="14" height="1" width="1" />
        <rect fill="#F8FAFC" x="9" y="14" height="1" width="1" />
        <rect fill="#F8FAFC" x="10" y="14" height="1" width="1" />
        <rect fill="#F8FAFC" x="11" y="14" height="1" width="1" />
        <rect fill="#F8FAFC" x="12" y="14" height="1" width="1" />
        <rect fill="#F8FAFC" x="13" y="14" height="1" width="1" />
        <rect fill="#F8FAFC" x="14" y="14" height="1" width="1" />
      </g>
    </svg>
  );

  const RemovePaletteItemIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      version="1.1"
      viewBox="0 0 240 240"
      className="h-8"
    >
      <g transform="scale(16 16)">
        <rect fill="#F8FAFC" x="0" y="0" height="1" width="1" />
        <rect fill="#F8FAFC" x="1" y="0" height="1" width="1" />
        <rect fill="#F8FAFC" x="2" y="0" height="1" width="1" />
        <rect fill="#F8FAFC" x="3" y="0" height="1" width="1" />
        <rect fill="#F8FAFC" x="4" y="0" height="1" width="1" />
        <rect fill="#F8FAFC" x="5" y="0" height="1" width="1" />
        <rect fill="#F8FAFC" x="6" y="0" height="1" width="1" />
        <rect fill="#F8FAFC" x="7" y="0" height="1" width="1" />
        <rect fill="#F8FAFC" x="8" y="0" height="1" width="1" />
        <rect fill="#F8FAFC" x="9" y="0" height="1" width="1" />
        <rect fill="#F8FAFC" x="10" y="0" height="1" width="1" />
        <rect fill="#F8FAFC" x="11" y="0" height="1" width="1" />
        <rect fill="#F8FAFC" x="12" y="0" height="1" width="1" />
        <rect fill="#F8FAFC" x="13" y="0" height="1" width="1" />
        <rect fill="#F8FAFC" x="14" y="0" height="1" width="1" />
        <rect fill="#F8FAFC" x="0" y="1" height="1" width="1" />
        <rect fill="#F8FAFC" x="1" y="1" height="1" width="1" />
        <rect fill="#F8FAFC" x="2" y="1" height="1" width="1" />
        <rect fill="#F8FAFC" x="3" y="1" height="1" width="1" />
        <rect fill="#F8FAFC" x="4" y="1" height="1" width="1" />
        <rect fill="#F8FAFC" x="5" y="1" height="1" width="1" />
        <rect fill="#F8FAFC" x="6" y="1" height="1" width="1" />
        <rect fill="#F8FAFC" x="7" y="1" height="1" width="1" />
        <rect fill="#F8FAFC" x="8" y="1" height="1" width="1" />
        <rect fill="#F8FAFC" x="9" y="1" height="1" width="1" />
        <rect fill="#F8FAFC" x="10" y="1" height="1" width="1" />
        <rect fill="#F8FAFC" x="11" y="1" height="1" width="1" />
        <rect fill="#F8FAFC" x="12" y="1" height="1" width="1" />
        <rect fill="#F8FAFC" x="13" y="1" height="1" width="1" />
        <rect fill="#F8FAFC" x="14" y="1" height="1" width="1" />
        <rect fill="#F8FAFC" x="0" y="2" height="1" width="1" />
        <rect fill="#F8FAFC" x="1" y="2" height="1" width="1" />
        <rect fill="#F8FAFC" x="2" y="2" height="1" width="1" />
        <rect fill="#F8FAFC" x="3" y="2" height="1" width="1" />
        <rect fill="#F8FAFC" x="4" y="2" height="1" width="1" />
        <rect fill="#F8FAFC" x="5" y="2" height="1" width="1" />
        <rect fill="#F8FAFC" x="6" y="2" height="1" width="1" />
        <rect fill="#F8FAFC" x="7" y="2" height="1" width="1" />
        <rect fill="#F8FAFC" x="8" y="2" height="1" width="1" />
        <rect fill="#F8FAFC" x="9" y="2" height="1" width="1" />
        <rect fill="#F8FAFC" x="10" y="2" height="1" width="1" />
        <rect fill="#F8FAFC" x="11" y="2" height="1" width="1" />
        <rect fill="#F8FAFC" x="12" y="2" height="1" width="1" />
        <rect fill="#F8FAFC" x="13" y="2" height="1" width="1" />
        <rect fill="#F8FAFC" x="14" y="2" height="1" width="1" />
        <rect fill="#F8FAFC" x="0" y="3" height="1" width="1" />
        <rect fill="#F8FAFC" x="1" y="3" height="1" width="1" />
        <rect fill="#F8FAFC" x="2" y="3" height="1" width="1" />
        <rect fill="#F8FAFC" x="3" y="3" height="1" width="1" />
        <rect fill="#F8FAFC" x="4" y="3" height="1" width="1" />
        <rect fill="#F8FAFC" x="5" y="3" height="1" width="1" />
        <rect fill="#F8FAFC" x="6" y="3" height="1" width="1" />
        <rect fill="#F8FAFC" x="7" y="3" height="1" width="1" />
        <rect fill="#F8FAFC" x="8" y="3" height="1" width="1" />
        <rect fill="#F8FAFC" x="9" y="3" height="1" width="1" />
        <rect fill="#F8FAFC" x="10" y="3" height="1" width="1" />
        <rect fill="#F8FAFC" x="11" y="3" height="1" width="1" />
        <rect fill="#F8FAFC" x="12" y="3" height="1" width="1" />
        <rect fill="#F8FAFC" x="13" y="3" height="1" width="1" />
        <rect fill="#F8FAFC" x="14" y="3" height="1" width="1" />
        <rect fill="#F8FAFC" x="0" y="4" height="1" width="1" />
        <rect fill="#F8FAFC" x="1" y="4" height="1" width="1" />
        <rect fill="#F8FAFC" x="2" y="4" height="1" width="1" />
        <rect fill="#F8FAFC" x="3" y="4" height="1" width="1" />
        <rect fill="#F8FAFC" x="4" y="4" height="1" width="1" />
        <rect fill="#F8FAFC" x="5" y="4" height="1" width="1" />
        <rect fill="#F8FAFC" x="6" y="4" height="1" width="1" />
        <rect fill="#F8FAFC" x="7" y="4" height="1" width="1" />
        <rect fill="#F8FAFC" x="8" y="4" height="1" width="1" />
        <rect fill="#F8FAFC" x="9" y="4" height="1" width="1" />
        <rect fill="#F8FAFC" x="10" y="4" height="1" width="1" />
        <rect fill="#F8FAFC" x="11" y="4" height="1" width="1" />
        <rect fill="#F8FAFC" x="12" y="4" height="1" width="1" />
        <rect fill="#F8FAFC" x="13" y="4" height="1" width="1" />
        <rect fill="#F8FAFC" x="14" y="4" height="1" width="1" />
        <rect fill="#F8FAFC" x="0" y="5" height="1" width="1" />
        <rect fill="#F8FAFC" x="1" y="5" height="1" width="1" />
        <rect fill="#F8FAFC" x="2" y="5" height="1" width="1" />
        <rect fill="#F8FAFC" x="3" y="5" height="1" width="1" />
        <rect fill="#F8FAFC" x="4" y="5" height="1" width="1" />
        <rect fill="#F8FAFC" x="5" y="5" height="1" width="1" />
        <rect fill="#F8FAFC" x="6" y="5" height="1" width="1" />
        <rect fill="#F8FAFC" x="7" y="5" height="1" width="1" />
        <rect fill="#F8FAFC" x="8" y="5" height="1" width="1" />
        <rect fill="#F8FAFC" x="9" y="5" height="1" width="1" />
        <rect fill="#F8FAFC" x="10" y="5" height="1" width="1" />
        <rect fill="#F8FAFC" x="11" y="5" height="1" width="1" />
        <rect fill="#F8FAFC" x="12" y="5" height="1" width="1" />
        <rect fill="#F8FAFC" x="13" y="5" height="1" width="1" />
        <rect fill="#F8FAFC" x="14" y="5" height="1" width="1" />
        <rect fill="#F8FAFC" x="0" y="6" height="1" width="1" />
        <rect fill="#F8FAFC" x="1" y="6" height="1" width="1" />
        <rect fill="#F8FAFC" x="2" y="6" height="1" width="1" />
        <rect fill="#F8FAFC" x="3" y="6" height="1" width="1" />
        <rect fill="#F8FAFC" x="4" y="6" height="1" width="1" />
        <rect fill="#F8FAFC" x="5" y="6" height="1" width="1" />
        <rect fill="#F8FAFC" x="6" y="6" height="1" width="1" />
        <rect fill="#F8FAFC" x="7" y="6" height="1" width="1" />
        <rect fill="#F8FAFC" x="8" y="6" height="1" width="1" />
        <rect fill="#F8FAFC" x="9" y="6" height="1" width="1" />
        <rect fill="#F8FAFC" x="10" y="6" height="1" width="1" />
        <rect fill="#F8FAFC" x="11" y="6" height="1" width="1" />
        <rect fill="#F8FAFC" x="12" y="6" height="1" width="1" />
        <rect fill="#F8FAFC" x="13" y="6" height="1" width="1" />
        <rect fill="#F8FAFC" x="14" y="6" height="1" width="1" />
        <rect fill="#F8FAFC" x="0" y="7" height="1" width="1" />
        <rect fill="#F8FAFC" x="1" y="7" height="1" width="1" />
        <rect fill="#0EA5E9" x="2" y="7" height="1" width="1" />
        <rect fill="#0EA5E9" x="3" y="7" height="1" width="1" />
        <rect fill="#0EA5E9" x="4" y="7" height="1" width="1" />
        <rect fill="#0EA5E9" x="5" y="7" height="1" width="1" />
        <rect fill="#0EA5E9" x="6" y="7" height="1" width="1" />
        <rect fill="#0EA5E9" x="7" y="7" height="1" width="1" />
        <rect fill="#0EA5E9" x="8" y="7" height="1" width="1" />
        <rect fill="#0EA5E9" x="9" y="7" height="1" width="1" />
        <rect fill="#0EA5E9" x="10" y="7" height="1" width="1" />
        <rect fill="#0EA5E9" x="11" y="7" height="1" width="1" />
        <rect fill="#0EA5E9" x="12" y="7" height="1" width="1" />
        <rect fill="#F8FAFC" x="13" y="7" height="1" width="1" />
        <rect fill="#F8FAFC" x="14" y="7" height="1" width="1" />
        <rect fill="#F8FAFC" x="0" y="8" height="1" width="1" />
        <rect fill="#F8FAFC" x="1" y="8" height="1" width="1" />
        <rect fill="#F8FAFC" x="2" y="8" height="1" width="1" />
        <rect fill="#F8FAFC" x="3" y="8" height="1" width="1" />
        <rect fill="#F8FAFC" x="4" y="8" height="1" width="1" />
        <rect fill="#F8FAFC" x="5" y="8" height="1" width="1" />
        <rect fill="#F8FAFC" x="6" y="8" height="1" width="1" />
        <rect fill="#F8FAFC" x="7" y="8" height="1" width="1" />
        <rect fill="#F8FAFC" x="8" y="8" height="1" width="1" />
        <rect fill="#F8FAFC" x="9" y="8" height="1" width="1" />
        <rect fill="#F8FAFC" x="10" y="8" height="1" width="1" />
        <rect fill="#F8FAFC" x="11" y="8" height="1" width="1" />
        <rect fill="#F8FAFC" x="12" y="8" height="1" width="1" />
        <rect fill="#F8FAFC" x="13" y="8" height="1" width="1" />
        <rect fill="#F8FAFC" x="14" y="8" height="1" width="1" />
        <rect fill="#F8FAFC" x="0" y="9" height="1" width="1" />
        <rect fill="#F8FAFC" x="1" y="9" height="1" width="1" />
        <rect fill="#F8FAFC" x="2" y="9" height="1" width="1" />
        <rect fill="#F8FAFC" x="3" y="9" height="1" width="1" />
        <rect fill="#F8FAFC" x="4" y="9" height="1" width="1" />
        <rect fill="#F8FAFC" x="5" y="9" height="1" width="1" />
        <rect fill="#F8FAFC" x="6" y="9" height="1" width="1" />
        <rect fill="#F8FAFC" x="7" y="9" height="1" width="1" />
        <rect fill="#F8FAFC" x="8" y="9" height="1" width="1" />
        <rect fill="#F8FAFC" x="9" y="9" height="1" width="1" />
        <rect fill="#F8FAFC" x="10" y="9" height="1" width="1" />
        <rect fill="#F8FAFC" x="11" y="9" height="1" width="1" />
        <rect fill="#F8FAFC" x="12" y="9" height="1" width="1" />
        <rect fill="#F8FAFC" x="13" y="9" height="1" width="1" />
        <rect fill="#F8FAFC" x="14" y="9" height="1" width="1" />
        <rect fill="#F8FAFC" x="0" y="10" height="1" width="1" />
        <rect fill="#F8FAFC" x="1" y="10" height="1" width="1" />
        <rect fill="#F8FAFC" x="2" y="10" height="1" width="1" />
        <rect fill="#F8FAFC" x="3" y="10" height="1" width="1" />
        <rect fill="#F8FAFC" x="4" y="10" height="1" width="1" />
        <rect fill="#F8FAFC" x="5" y="10" height="1" width="1" />
        <rect fill="#F8FAFC" x="6" y="10" height="1" width="1" />
        <rect fill="#F8FAFC" x="7" y="10" height="1" width="1" />
        <rect fill="#F8FAFC" x="8" y="10" height="1" width="1" />
        <rect fill="#F8FAFC" x="9" y="10" height="1" width="1" />
        <rect fill="#F8FAFC" x="10" y="10" height="1" width="1" />
        <rect fill="#F8FAFC" x="11" y="10" height="1" width="1" />
        <rect fill="#F8FAFC" x="12" y="10" height="1" width="1" />
        <rect fill="#F8FAFC" x="13" y="10" height="1" width="1" />
        <rect fill="#F8FAFC" x="14" y="10" height="1" width="1" />
        <rect fill="#F8FAFC" x="0" y="11" height="1" width="1" />
        <rect fill="#F8FAFC" x="1" y="11" height="1" width="1" />
        <rect fill="#F8FAFC" x="2" y="11" height="1" width="1" />
        <rect fill="#F8FAFC" x="3" y="11" height="1" width="1" />
        <rect fill="#F8FAFC" x="4" y="11" height="1" width="1" />
        <rect fill="#F8FAFC" x="5" y="11" height="1" width="1" />
        <rect fill="#F8FAFC" x="6" y="11" height="1" width="1" />
        <rect fill="#F8FAFC" x="7" y="11" height="1" width="1" />
        <rect fill="#F8FAFC" x="8" y="11" height="1" width="1" />
        <rect fill="#F8FAFC" x="9" y="11" height="1" width="1" />
        <rect fill="#F8FAFC" x="10" y="11" height="1" width="1" />
        <rect fill="#F8FAFC" x="11" y="11" height="1" width="1" />
        <rect fill="#F8FAFC" x="12" y="11" height="1" width="1" />
        <rect fill="#F8FAFC" x="13" y="11" height="1" width="1" />
        <rect fill="#F8FAFC" x="14" y="11" height="1" width="1" />
        <rect fill="#F8FAFC" x="0" y="12" height="1" width="1" />
        <rect fill="#F8FAFC" x="1" y="12" height="1" width="1" />
        <rect fill="#F8FAFC" x="2" y="12" height="1" width="1" />
        <rect fill="#F8FAFC" x="3" y="12" height="1" width="1" />
        <rect fill="#F8FAFC" x="4" y="12" height="1" width="1" />
        <rect fill="#F8FAFC" x="5" y="12" height="1" width="1" />
        <rect fill="#F8FAFC" x="6" y="12" height="1" width="1" />
        <rect fill="#F8FAFC" x="7" y="12" height="1" width="1" />
        <rect fill="#F8FAFC" x="8" y="12" height="1" width="1" />
        <rect fill="#F8FAFC" x="9" y="12" height="1" width="1" />
        <rect fill="#F8FAFC" x="10" y="12" height="1" width="1" />
        <rect fill="#F8FAFC" x="11" y="12" height="1" width="1" />
        <rect fill="#F8FAFC" x="12" y="12" height="1" width="1" />
        <rect fill="#F8FAFC" x="13" y="12" height="1" width="1" />
        <rect fill="#F8FAFC" x="14" y="12" height="1" width="1" />
        <rect fill="#F8FAFC" x="0" y="13" height="1" width="1" />
        <rect fill="#F8FAFC" x="1" y="13" height="1" width="1" />
        <rect fill="#F8FAFC" x="2" y="13" height="1" width="1" />
        <rect fill="#F8FAFC" x="3" y="13" height="1" width="1" />
        <rect fill="#F8FAFC" x="4" y="13" height="1" width="1" />
        <rect fill="#F8FAFC" x="5" y="13" height="1" width="1" />
        <rect fill="#F8FAFC" x="6" y="13" height="1" width="1" />
        <rect fill="#F8FAFC" x="7" y="13" height="1" width="1" />
        <rect fill="#F8FAFC" x="8" y="13" height="1" width="1" />
        <rect fill="#F8FAFC" x="9" y="13" height="1" width="1" />
        <rect fill="#F8FAFC" x="10" y="13" height="1" width="1" />
        <rect fill="#F8FAFC" x="11" y="13" height="1" width="1" />
        <rect fill="#F8FAFC" x="12" y="13" height="1" width="1" />
        <rect fill="#F8FAFC" x="13" y="13" height="1" width="1" />
        <rect fill="#F8FAFC" x="14" y="13" height="1" width="1" />
        <rect fill="#F8FAFC" x="0" y="14" height="1" width="1" />
        <rect fill="#F8FAFC" x="1" y="14" height="1" width="1" />
        <rect fill="#F8FAFC" x="2" y="14" height="1" width="1" />
        <rect fill="#F8FAFC" x="3" y="14" height="1" width="1" />
        <rect fill="#F8FAFC" x="4" y="14" height="1" width="1" />
        <rect fill="#F8FAFC" x="5" y="14" height="1" width="1" />
        <rect fill="#F8FAFC" x="6" y="14" height="1" width="1" />
        <rect fill="#F8FAFC" x="7" y="14" height="1" width="1" />
        <rect fill="#F8FAFC" x="8" y="14" height="1" width="1" />
        <rect fill="#F8FAFC" x="9" y="14" height="1" width="1" />
        <rect fill="#F8FAFC" x="10" y="14" height="1" width="1" />
        <rect fill="#F8FAFC" x="11" y="14" height="1" width="1" />
        <rect fill="#F8FAFC" x="12" y="14" height="1" width="1" />
        <rect fill="#F8FAFC" x="13" y="14" height="1" width="1" />
        <rect fill="#F8FAFC" x="14" y="14" height="1" width="1" />
      </g>
    </svg>
  );

  const UndoIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      version="1.1"
      viewBox="0 0 90 90"
      className="h-8"
    >
      <defs>
        <style>.cls-1&#123;fill:#0274fe;&#125;</style>
      </defs>
      <polygon
        className="cls-1"
        points="48.34 70 38.34 70 28.34 70 28.34 80 38.34 80 48.34 80 58.34 80 68.34 80 68.34 70 58.34 70 48.34 70"
      />
      <polygon
        className="cls-1"
        points="68.34 40 68.34 50 68.34 50 68.34 60 68.34 70 78.34 70 78.34 60 78.34 50 78.34 50 78.34 40 68.34 40"
      />
      <polygon
        className="cls-1"
        points="28.34 50 28.34 60 38.34 60 38.34 50 38.34 40 48.34 40 58.34 40 68.34 40 68.34 30 58.34 30 48.34 30 38.34 30 38.34 20 38.34 10 28.34 10 28.34 20 18.34 20 18.34 30 8.34 30 8.34 40 18.34 40 18.34 50 28.34 50"
      />
    </svg>
  );

  if (skinItem == "dropper") {
    return DropperIcon;
  } else if (skinItem == "dropper-active") {
    return DropperIconActive;
  } else if (skinItem == "move-up") {
    return MoveUpIcon;
  } else if (skinItem == "move-down") {
    return MoveDownIcon;
  } else if (skinItem == "move-right") {
    return MoveRightIcon;
  } else if (skinItem == "move-left") {
    return MoveLeftIcon;
  } else if (skinItem == "add-palette-item") {
    return AddPaletteItemIcon;
  } else if (skinItem == "remove-palette-item") {
    return RemovePaletteItemIcon;
  } else if (skinItem == "undo") {
    return UndoIcon;
  }
  return null;
};
