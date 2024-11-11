pkgs.python39Packages.python39Packages.buildPythonApplication {
      pname = "pages";
      src = ./pages;
      buildInputs = [ pkgs.python39Packages.requests ];
      postInstall = ''
        mkdir -p $out/bin
        cp $out/share/pages/pages $out/bin/
      '';
    }