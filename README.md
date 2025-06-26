# Artifact Documentation for A Lightweight Type-and-Effect System for Invalidation Safety

## 1. Overview of the Artifact

Our paper introduces a new type system: InvalML, for permanent and temporary invalidation. In the paper, we propose a type inference algorithm for InvalML and prove the soundness and completeness.

This artifact implements InvalML and the type inference algorithm based on the MLscript language. We reuse the infrastructure of the MLscript language, augmenting it with our type inference algorithm and necessary syntax and code generation. Our artifact consists of two parts:

1. The main type checker is implemented as a part of the MLscript compiler, written in Scala. It also includes test cases for InvalML and the inference algorithm.
2. The [web demo](https://anonymous8538.github.io/780/) offers a convenient way to compile and run InvalML programs directly in the browser, eliminating the need for the toolchain dependencies. The results of compilation, such as type checking, can be viewed in the web demo.

The main type checker is our main contribution, while the web demo illustrates the reusability of our main project. We do not provide a command-line tool specifically for compiling an MLscript file.

This documentation contains the evaluation instructions for the main type checker and the web demo. We also introduce the implementation of our algorithm and provide a user guide for the web demo.

### 1.1 List of Claims

Most claims in the paper can be verified in the test suite. One can modify the examples in the test cases or try them out in the web demo.

1. The implementation can handle examples in the paper. Such examples can be found in both `hkmc2/shared/src/test/mlscript/invalml/web-demos/ExamplesInThePaper.mls` and the web demo.
2. The extensions to InvalML can be type-checked by the implementation. One can check the following test files or find them in the web demo:
    - Scope-safe metaprogramming: `hkmc2/shared/src/test/mlscript/invalml/web-demos/Staging.mls`
    - Exceptions: `hkmc2/shared/src/test/mlscript/invalml/web-demos/Exception.mls`
    - Stack-based memory management: `hkmc2/shared/src/test/mlscript/invalml/web-demos/StackMM.mls`
3. We also include a case study that has not been mentioned in the paper. This case study implements a simple constraint solver. It is available in the web demo and test file `hkmc2/shared/src/test/mlscript/invalml/web-demos/SimpleConstraintSolver.mls`.

### 1.2 Syntax Differences

There are some minor differences in the syntax of the artifact, as compared to the paper:

- The artifact uses `|`, `&`, and `~` rather than the paper's stylized $\vee$, $\wedge$, and $\neg$ respectively
- The artifact uses `region r in ...` rather than the paper's `region r; ...`
- The artifact uses syntax like `[outer, T, E extends outer] -> T ->{E} T` rather than the paper's $\forall \omega, T, E \{E \le \omega\}.\, T \stackrel{E}{\to} T$
- The artifact uses the following syntax to declare ADTs:
    
    ```fsharp
    class List[T] with
      constructor
        Nil
        Cons(x: T, xs: List[out T])
    ```
    
    Which is equivalent to the syntax used in the paper:
    
    ```scala
    enum List[T]:
      case Nil
      case Cons(x: T, xs: List[out T])
    ```
    

### 1.3 Hardware Requirements

This artifact does not require any specific hardware to run. A general computer with Java 11 and Node.js 24 can compile the main project from scratch, and a computer with Docker can complete the artifact evaluation by using the Docker image. Devices connected to the Internet with modern browsers can access the web demo.

### 1.4 Reusability Guide

The main project can be reused as follows:

1. The main project can be extended directly. One can modify the corresponding parts to extend the system and the whole compiler, as we will explain in Section 3.
2. The web demo shows the other approach to reusing the main project. The main project can be compiled to JavaScript via [Scala.js](https://www.scala-js.org/). The web demo uses the generated code. It reflects that the main project can be invoked by other programs to output both intermediate and final results of the compilation.

## 2. Getting Started

This section displays the instructions for setup. There are three ways of evaluating the artifact, and we provide a detailed guide for each of them.

### 2.1 Running the Main Project (Using Docker)

A Docker image is prepared with all necessary dependencies to compile the main project.

1. Run the command `docker load < invalml.tar.gz` to load the Docker image.
2. Run the command `docker run -it --rm mlscript/invalml` to launch a temporary container.
3. Run the following commands to run all the tests:
    
    ```bash
    cd /home/ubuntu/mlscript
    sbt hkmc2AllTests/test
    ```
    
    All tests should be passed.
    
4. After executing the tests, you may exit the container, and it will be destroyed automatically.

### 2.2 Running the Main Project (From Scratch)

To build the main project from scratch, please follow the steps below to ensure that all dependencies are installed correctly.

1. We recommend that you use [Coursier](https://get-coursier.io/) to set up the Scala development environment. You can follow [these instructions](https://get-coursier.io/docs/cli-installation) to install Coursier on your device. You may need to install Java manually on some platforms. After the installation of Coursier, you can run the command `cs install sbt scala` to install **sbt** and **Scala**. Other approaches to installing **Java**, **sbt**, and **Scala** should also work. Please ensure you have Java 11 or above.
2. Please install [Node.js 24](https://nodejs.org/en) and **npm** (Node Package Manager). If there are already other versions of **Node.js** on your device, you can consider using a version manager like [nvm](https://github.com/nvm-sh/nvm). Please ensure the node executable is in the `PATH` such that the tests can be executed correctly.

Then, you can download and unpack the artifact. Suppose that the artifact is unpacked at `mlscript/`.  Tests can be executed as follows:

1. Run `sbt` at `mlscript/`. An interactive shell of **sbt** will be started.
2. Run the command `hkmc2AllTests/test` in the sbt shell. It will execute all the tests.
3. All tests should be passed.
4. After executing the tests, you can run `exit` to exit the interactive shell.

### 2.3 Running the Web Demo

The web demo can be accessed via the link https://anonymous8538.github.io/780/. It is designed to work on desktop computers and laptops. Please ensure that JavaScript is enabled.

## 3. Introduction to the Main Project

### 3.1 Project Structure

Our artifact is based on MLscript. The structure of the main project is shown as follows:

- `hkmc2/shared/src`
    - `main/scala`
        - `hkmc2/invalml`: InvalML type checker implementation.
        - Other subdirectories: original implementations for MLscript.
    - `test`
        - `mlscript/invalml`: InvalML type checking test files.
        - Other subdirectories: test files for other implementations of MLscript.
- `hkmc2DiffTests/src/test/scala/hkmc2`: test framework for the current version of MLscript.
- Other directories: other subprojects and legacy MLScript components.

The files in `hkmc2/invalml` are the implementation of our type inference algorithm, and `mlscript/invalml` contains the corresponding test files. In the following subsections, we will introduce how these files are related to the system in the paper. For the remaining files, we only introduce the parts that we’ve modified and how we extended the existing MLscript compiler to support our system. The introduction to other parts is omitted for simplicity.

### 3.2 Correspondence between Paper and Implementation

The implementation of InvalML and its type checker is located at directory `hkmc2/shared/src/main/scala/hkmc2/invalml/`. 

| Definition | Location in the Paper | Source Code Files |
| --- | --- | --- |
| Syntax of types | Fig. 1 in Section 3.1 | `hkmc2/shared/src/main/scala/hkmc2/invalml/types.scala` |
| Type inference algorithm | Fig. 6 in Section 4.1 | `hkmc2/shared/src/main/scala/hkmc2/invalml/InvalML.scala` |
| Normal forms | Section 4.2 | `hkmc2/shared/src/main/scala/hkmc2/invalml/NormalForm.scala` |
| Skolem bound inlining function, constraint solver, and extrusion | Fig.7 in Section 4.3, Fig. 8 in Section 4.3, and Fig. 9 in Section 4.4 | `hkmc2/shared/src/main/scala/hkmc2/invalml/ConstraintSolver.scala` |

Other auxiliary definitions that are not mentioned in the paper are given in the same directory. These files mainly serve for type output.

| Definition | Source Code Files |
| --- | --- |
| Type pretty-printer | `hkmc2/shared/src/main/scala/hkmc2/invalml/PrettyPrinter.scala` |
| Simple type simplifier | `hkmc2/shared/src/main/scala/hkmc2/invalml/TypeSimplifier.scala` |
| Type traverser | `hkmc2/shared/src/main/scala/hkmc2/invalml/TypeTraverser.scala` |

Besides, we also changed several files originally belonging to the MLscript compiler to support corresponding parsing and code generation.

| Definition | Location in the Paper | Source Code Files |
| --- | --- | --- |
| Term Syntax | Fig. 1 in Section 3.1 | `hkmc2/shared/src/main/scala/hkmc2/syntax/*.scala` |
| Semantics | Fig. 18 in Appendix B.4 | `hkmc2/shared/src/main/scala/hkmc2/codegen/Lowering.scala` |

### 3.3 Running Tests

The suffix of test files is `.mls`. Test cases are separated from each other by empty lines. For instance, the following code has three blocks of test cases:

```fsharp
fun fork: [A, B extends ~A, T1, T2] -> (Any ->{A} T1, Any ->{B} T2) ->{A | B} Pair[out T1, out T2]
fork
//│ Type: ['A, 'B, 'T1, 'T2] -> ((⊤) ->{'A} 'T1, (⊤) ->{'B} 'T2) ->{'A ∨ 'B} Pair[out 'T1, out 'T2]
//│ Where:
//│   'B <: ¬'A

:e
region x in
  fork((_ => x.ref 1), (_ => x.ref 2))
//│ ╔══[ERROR] Type error in function literal with expected type (⊤) ->{'B} 'T2
//│ ║  l.24: 	  fork((_ => x.ref 1), (_ => x.ref 2))
//│ ║        	                             ^^^^^^^
//│ ╟── because: cannot constrain  'reg  <:  'B
//│ ╟── because: cannot constrain  x  <:  'B
//│ ╟── because: cannot constrain  x  <:  ¬'A
//│ ╟── because: cannot constrain  'A  <:  ¬x
//│ ╙── because: cannot constrain  x  <:  ¬x
//│ Type: Pair[out Ref[Int, ?], out Ref[Int, ?]]

region x in
  region y in
    fork((_ => x.ref 1), (_ => y.ref 2))
//│ Type: Pair[out Ref[Int, ?], out Ref[Int, ?]]
```

The test output of each test block, starting with `//|`, is appended to the test code. Modern code editors like VSCode can automatically reload the changes from the disk. The test output shows the inferred type of the given program and type errors (if any). The test flag`:e` indicates that the type errors that occurred are expected. In the second example above, one cannot modify the same region in parallel. Therefore, our system rejects the program by raising a type error saying that `cannot constrain x <: ¬x`.

You can also use the watch mode by running the command `~hkmc2DiffTests/Test/run` in the `sbt` interactive shell instead. In watch mode, you can modify the test files, and the compiler will detect the modification automatically, recompiling the modified files for you.

### 3.4 Other Components of The Main Project

This subsection briefly introduces the other important components in the main project. For simplicity, we omit the introduction to legacy compiler code and subprojects, focusing on the main infrastructure that our implementation depends on. All the paths mentioned below are relative to `hkmc2/shared/src/main/scala/hkmc2`.

- Lexing and parsing: The lexer (`syntax/Token.scala`) consumes the input string and generates tokens, defined in `syntax/Token.scala`. The parser (`syntax/Parser.scala`) handles the tokens according to the parse rules defined in `syntax/ParseRule.scala` and generates a parsed tree. The structure of parsed trees is given in `syntax/Tree.scala`.
- Elaboration: The elaborator (`semantics/Elaborator.scala`) accepts a parsed tree, generating symbols (`semantics/Symbol.scala`) and handling the symbol references. It elaborates the given parsed tree into terms (`semantics/Term.scala`) that can be type-checked or lowered later. The pattern-matching syntax of MLscript, called [ultimate conditional syntax](https://dl.acm.org/doi/abs/10.1145/3689746), is also desugarred in this stage. The process is defined in files `semantics/ucs/*.scala`.
- Lowering and code generation: To support various backends, MLscript adopts a block IR (`codegen/Block.scala`). An elaborated term needs to be lowered (`codegen/Lowering.scala`) to the block IR before the code generation. Such blocks can later be translated to other languages, like JavaScript (`codegen/js/JSBuilder.scala`) and C++ (`codegen/cpp/*.scala`).

### 3.5 Compatibility Check

We have tested two methods on the following operating systems and Docker versions.

|  | Using Docker | Starting from scratch |
| --- | --- | --- |
| macOS | TODO | Test passed |
| Windows 11 | Test passed with Docker v20.10.8 | Test passed |

## 4. Guide to the Web Demo

### 4.1 User Interface

![screenshot.webp](screenshot.webp)

The user interface of the web demo, as shown in the above screenshot, consists of two parts: the edit area and the output area. In the left-hand side’s edit area, one can write MLscript programs or load the built-in examples via the drop-down box. Once the program is done, you can click the compile button to compile the program, and the results of each stage can be inspected in the right-hand side’s output area.

- The typer tab shows the type of the whole program inferred by our algorithm. If there is any type error, it will be displayed in the diagnostics area. The unit type will be omitted for simplicity.
- The parser tab shows the parsed tree of the given program. You can click on nodes to fold/unfold them.
- The elaborator and resolver tabs show the result of elaboration. The former prints the elaborated terms with the original names used in the parsed trees. The latter substitutes those names with resolved symbol references.
- The lowering tab shows the lowered blocks, and the code generation tab shows the generated JavaScript code.

### 4.2 Compatibility Check

We have tested the web demo on the following operating systems and browsers.

|  | macOS | Windows 11 |
| --- | --- | --- |
| Apple Safari | TODO | N/A |
| Google Chrome | TODO | 137.0.7151.120 |
| Microsoft Edge | TODO | 137.0.3296.93 |